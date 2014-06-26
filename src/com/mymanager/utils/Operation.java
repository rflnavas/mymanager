package com.mymanager.utils;

public enum Operation{
	INSERT("I"),
	DELETE("D"),
	UPDATE("U"),
	SELECT("S"),
	TEST("T");
	String opType;
	private Operation(String opType) {
		this.opType = opType;
	}
	public String opType() {
		return this.opType;
	}
	
	public static Operation getEnum(String op){
		Operation operation = null;
		Operation[] ops = Operation.values();
		for(int i = 0 ; i < ops.length ; i++){
			if(op.equalsIgnoreCase(ops[i].opType)){
				operation = ops[i];
				break;
			}
		}
		if(operation == null){
			throw new IllegalArgumentException("Cannot find ENUM whose operation name is " + op);
		}
		return operation;
		
	}
}

/*
 * 
 * public static <T extends Enum<T>> T valueOfIgnoreCase(Class<T> enumeration, String name) {
    for(T enumValue : enumeration.getEnumConstants()) {
        if (enumValue.name().equalsIgnoreCase(name)) {
            return enumValue;
        }
    }
    throw new IllegalArgumentException("There is no value with name '" + name + " in Enum " + enumeration.getClass().getName());        
}*/
