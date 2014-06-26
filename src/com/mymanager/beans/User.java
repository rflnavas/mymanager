package com.mymanager.beans;


public class User{
	
	private long id;
	private String name;
	private String email;
	private String password;
	private int daysToChangePass;
	private String registerDate;
	
	public User() {
		
	}
	
	public static User newUser(Long id, String name, String email, 
			String password, Integer daysToChangePassword, String registerDate){
		User u = new User();
		if(id != null){
			u.setId(id);
		}
		u.setName(name);
		u.setEmail(email);
		u.setPassword(password);
		u.setDaysToChangePassword(daysToChangePassword);
		u.setRegisterDate(registerDate);
		return u;
	}

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public int getDaysToChangePassword() {
		return daysToChangePass;
	}
	public void setDaysToChangePassword(int daysToChangePassword) {
		this.daysToChangePass = daysToChangePassword;
	}
	public String getRegisterDate() {
		return registerDate;
	}
	public void setRegisterDate(String registerDate) {
		this.registerDate = registerDate;
	}
	
	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("User [id=").append(this.id).
		append(", name=").append(this.name).
		append(", email=").append(this.email).
		append(", password=").append(this.password).
		append(", daysToChangePass=").append(this.daysToChangePass).
		append(", registerDate=").append(this.registerDate).
		append("]");
		return sb.toString();
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (id ^ (id >>> 32));
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (id != other.id)
			return false;
		return true;
	}
	
}
