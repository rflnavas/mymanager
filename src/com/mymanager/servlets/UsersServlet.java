package com.mymanager.servlets;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Date;
import java.util.Random;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.mymanager.beans.User;
import com.mymanager.exceptions.MyManagerException;
import com.mymanager.services.MyManagerService;
import com.mymanager.test.Test;
import com.mymanager.utils.Formats;
import com.mymanager.utils.Operation;
import com.mymanager.utils.ServletUtils;

public class UsersServlet extends HttpServlet{

	private static final long serialVersionUID = -6449986622466318544L;
	
	private MyManagerService mms = new MyManagerService();
	private HttpServletRequest request;
	private HttpServletResponse response;
	
	@Override
	public void init() throws ServletException {
		super.init();
	}
	
	@Override
	protected void service(HttpServletRequest arg0, HttpServletResponse arg1)
			throws ServletException, IOException {
		super.service(arg0, arg1);
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doPost(req, resp);
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		this.request = req;
		this.response = resp;
		String operation = req.getParameter("op");
		Operation op = null;
		op = Operation.getEnum(operation);
		try {
			switch (op){
				case INSERT:
					this.createUser();
					break;
				case DELETE:
					this.deleteUser();
					break;
				case UPDATE:
					this.updateUser();
					break;
				case SELECT:
					this.selectUsers();
					break;
				case TEST:
					this.testGSON();
					break;	
			}
		} catch (Exception e) {
			throw new ServletException(e.getMessage());
		}
		
	}
	
	private void testGSON() throws IOException {
		System.out.println("Entrando en modo Testeo");
		String json = Test.testGSON();
		ServletUtils.responseAsJSON(this.response);
		this.response.getWriter().write(json);
	}

	private boolean createUser() throws MyManagerException{
		
		boolean success;
		try {
			Gson g = new Gson();
			
			String jsonNewUser = request.getParameter("json");
			User u = g.fromJson(jsonNewUser, User.class);
			//We don't have to retrieve data as usual (see commented code snippet below) as we passed a JSON string in $http. 
			//Gson converts the JSON into an User object
			
//			String name = this.request.getParameter("name");
//			String password = this.request.getParameter("password");
//			String email = this.request.getParameter("email");
//			int daysToChangePassword = Integer.parseInt(this.request.getParameter("daysToChangePassword"));
			
			Date registerDate = new Date();
			Random r = new Random();
			long newId = Math.abs(r.nextLong() % 1000);
			//We don't need it anymore because of the reasons we explained previously.
//			u = User.newUser(newId, name, email, password, 
//					daysToChangePassword, Formats.DDMMYYY_FORMAT.format(registerDate));
			//As the new user bean is created, we only have to set some properties 
			//such as the register date or the generated id.
			u.setRegisterDate(Formats.DDMMYYY_FORMAT.format(registerDate));
			u.setId(newId);
			
			jsonNewUser = g.toJson(u);
			ServletUtils.responseAsJSON(this.response);
			response.getWriter().write(jsonNewUser);
			success = true;
			//success = mms.createUser(name, password, email, daysToChangePassword, registerDate);
		} catch (IOException | NumberFormatException e) {
			success = false;
			throw new MyManagerException(e.getMessage());
		}
		return success;
	}
	
	private boolean deleteUser() throws MyManagerException{
		boolean success;
		String sid = this.request.getParameter("id");
		try {
			//long id = Long.valueOf(sid);
			success =  true;//mms.deleteUser(id);
			ServletUtils.responseAsJSON(this.response);
			response.getWriter().write("{\"id\":" + sid + "}");
			
		} catch (NumberFormatException | IOException e) {
			success = false;
			throw new MyManagerException(e.getMessage());
		}
		return success;
	}
	
	private boolean updateUser() throws MyManagerException{
		
		boolean success;
		try {
			Gson g = new Gson();
			
			String jsonUpdUser = request.getParameter("json");
			User u = g.fromJson(jsonUpdUser, User.class);
			success =  mms.updateUser(u);
			ServletUtils.responseAsJSON(this.response);
			response.getWriter().write(jsonUpdUser);
		
		} catch (NumberFormatException | IOException | SQLException e) {
			success = false;
			throw new MyManagerException(e.getMessage());
		}
		return success;
	}
	
	private boolean selectUsers(){
		throw new UnsupportedOperationException();
	}
}
