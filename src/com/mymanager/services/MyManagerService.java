package com.mymanager.services;

import java.sql.SQLException;
import java.util.List;

import com.mymanager.beans.User;
import com.mymanager.dao.UserDAO;
import com.mymanager.utils.Criteria;

public class MyManagerService {
	
	public boolean createUser(String name, String password, String email, 
			int daysToChangePassword, String registerDate) throws SQLException{
		
		UserDAO uDAO = new UserDAO();
		User u = User.newUser(null, name, email, password, daysToChangePassword, registerDate);
		int numRows = uDAO.insert(u);
		return numRows > 0;
	}
	
	public boolean createUser(User u) throws SQLException{
		
		UserDAO uDAO = new UserDAO();
		int numRows = uDAO.insert(u);
		return numRows > 0;
	}

	public boolean deleteUser(long id) throws SQLException{
		
		UserDAO uDAO = new UserDAO();
		int numDeleted = uDAO.delete(id);
		return numDeleted > 0;
	}
	
	public boolean updateUser(long id, String name, String password, String email, 
			int daysToChangePassword) throws SQLException{
		throw new UnsupportedOperationException();
	}
	
	public boolean updateUser(User u) throws SQLException{
		UserDAO uDAO = new UserDAO();
		int numRows = uDAO.update(u);
		return numRows > 0;
	}
	
	public List<User> selectUser() throws SQLException{

		UserDAO uDAO = new UserDAO();
		return uDAO.select(new Criteria());
	}
	
}
