package com.mymanager.test;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.google.gson.Gson;
import com.mymanager.beans.User;

public class Test {
	public static void main(String[] args) {
		
		Pattern p = Pattern.compile("^([\\w]+[\\d][\\w\\d]*)|([\\d]+[\\w][\\w\\d]*)$");
		Matcher m = p.matcher("rr2F");
		System.out.println(m.find());
		
		testGSON();
		
	}

	public static String testGSON() {
		
		Gson g = new Gson();
		
		User u1 = User.newUser(1L, "Rafa", "rafa@gamail.com", "1234", 45, "21/09/2013");
		User u2 = User.newUser(2L, "Ivan", "ivan@gamail.com", "5678", 30, "17/05/2013");
		List<User> list = new ArrayList<>();
		list.add(u1);
		list.add(u2);
		String json = g.toJson(list);
		System.out.println(json);
		return json;
		
	}
}
