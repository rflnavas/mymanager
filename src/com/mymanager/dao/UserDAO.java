package com.mymanager.dao;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import com.mymanager.beans.User;
import com.mymanager.utils.Criteria;
import com.mymanager.utils.Formats;

public class UserDAO extends DAO<User>{
	
	public enum Columns{
		ID("Id"),
		NAME("Name"),
		PASSWORD("Password"),
		EMAIL("Email"),
		DAYTOCHANGEPASSWORD("DaysToChangePassword"),
		REGISTERDATE("RegisterDate");
		
		String colName;
		Columns(String colName){
			this.colName = colName;
		}
		
		public String colName() {
			return colName;
		}
	};
	
	private static final String INSERT_USER= 
			"INSERT INTO Users(ID, NAME, PASSWORD, EMAIL, DAYTOCHANGEPASSWORD, REGISTERDATE)"+
			" VALUES(?, ?, ?, ?, ?)";
	
	private static final String DELETE_USER= 
			"DELETE FROM Users WHERE ID = ?";
	
	private static final String SELECT_USER= 
			"SELECT ID, NAME, PASSWORD, EMAIL, DAYTOCHANGEPASSWORD, REGISTERDATE FROM Users";
	
	public UserDAO() {

	}
	
	public int insert(User u) {
		
		PreparedStatement ps = null;
		int numRows;
		try (Connection conn = DAO.getConnection()){
			ps = conn.prepareStatement(INSERT_USER);
			ps.setLong(0, u.getId());
			ps.setString(1, u.getEmail());;
			ps.setString(2, u.getPassword());
			ps.setInt(3, u.getDaysToChangePassword());
			java.util.Date d = Formats.DDMMYYY_FORMAT.parse(u.getRegisterDate());
			
			ps.setDate(4, new java.sql.Date(d.getTime()));
			
			numRows = ps.executeUpdate();
			return numRows;
		} catch (SQLException | ParseException sp) {
			sp.printStackTrace();
			return -1;
		}
		
	}

	public int update(User u) {
		
		return -1;
	}

	public List<User> select(Criteria c) {

		PreparedStatement ps = null;
		ResultSet rs = null;
		
		List<User> users = new ArrayList<User>();
		//Using Java 7 try-with-resource feature
		try (Connection conn = DAO.getConnection()){
			String query = SELECT_USER;
			if(c == null){
				ps = conn.prepareStatement(query);
			}else{
				throw new UnsupportedOperationException("De momento sin criteria");
			}
			
			rs = ps.executeQuery();
			
			while(rs.next()){
				long id = rs.getLong(Columns.ID.colName());
				String name = rs.getString(Columns.NAME.colName());
				String password = rs.getString(Columns.PASSWORD.colName());
				String email = rs.getString(Columns.EMAIL.colName());
				int daysToChangePassword = rs.getInt(Columns.DAYTOCHANGEPASSWORD.colName());
				java.sql.Date registerDate = rs.getDate(Columns.REGISTERDATE.colName());
				String strDate = Formats.DDMMYYY_FORMAT.format(new Date(registerDate.getTime()));
				User.newUser(id, name, email, password, daysToChangePassword, strDate);
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return users;
	}

	public int delete(long id) throws SQLException {
		PreparedStatement ps = null;
		int numDeleted;
		try (Connection conn = DAO.getConnection()){
			ps = conn.prepareStatement(DELETE_USER);
			ps.setLong(0, id);
			numDeleted = ps.executeUpdate();
			
		} catch (SQLException e) {
			numDeleted = -1;
			throw new SQLException(e.getMessage());
		}
		
		return numDeleted;
	}
	
	
}
