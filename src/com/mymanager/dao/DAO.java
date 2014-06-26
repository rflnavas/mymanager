package com.mymanager.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import com.mymanager.utils.Criteria;

public abstract class DAO <T>{
	
	protected static Connection getConnection(){
		
		Connection c = null;
		
		return null;
		
	}

	public abstract int insert(T element) throws SQLException;
	public abstract int update(T element) throws SQLException;
	public abstract List<T> select(Criteria c) throws SQLException;
	public abstract int delete(long id) throws SQLException;

	public static void close(Connection conn) {
		try {
			if(conn != null){
				conn.close();
			}
		} catch (SQLException e) {
		}
		
	}

	public static void close(PreparedStatement ps) {
		try {
			if(ps != null){
				ps.close();
			}
		} catch (Exception e) {
		}
	}
}
