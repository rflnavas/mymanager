package com.mymanager.utils;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

public class ServletUtils {
	
	private ServletUtils(){}
	
	public static void responseAsJSON(HttpServletResponse resp){
		resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");
	}
	
	public static String toJSON(List<? extends Object> list){
		Gson g = new Gson();
		String json = g.toJson(list);
		return json;
	}
	
	public static String toJSON(Object o){
		Gson g = new Gson();
		String json = g.toJson(o);
		return json;
	}
}
