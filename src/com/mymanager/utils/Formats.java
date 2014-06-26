package com.mymanager.utils;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

public class Formats {
	
	public static final DateFormat DDMMYYY_FORMAT = new SimpleDateFormat("dd/MM/yyyy");
	
	static{
		DDMMYYY_FORMAT.setLenient(false);
	}
	private Formats() {}
}
