const query = require('./index')
const fs = require('fs')


const tables = [
	`CREATE TABLE users (
		id int NOT NULL AUTO_INCREMENT,
		username VARCHAR(255) NOT NULL,
		email VARCHAR(255) UNIQUE NOT NULL,
		password VARCHAR(255) NOT NULL,
		phone_number VARCHAR(255),
		profile_image VARCHAR(255),
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		last_login DATETIME,
		PRIMARY KEY (id)
	);`,
	
	`CREATE TABLE verifications(
		/*id int NOT NULL AUTO_INCREMENT,*/
		user int NOT NULL,
		email_verified Boolean,
		email_verification_code VARCHAR(255),
		is_active Boolean,
		PRIMARY KEY (user),
		FOREIGN KEY (user) REFERENCES users(id)
	);`,
	
	`CREATE TABLE notifications(
		/*id int NOT NULL AUTO_INCREMENT,*/
		user int NOT NULL,
		sender int NOT NULL,
	
		PRIMARY KEY (sender, user),
		FOREIGN KEY (sender) REFERENCES users(id),
		FOREIGN KEY (user) REFERENCES users(id)
	);`,
	
	`CREATE TABLE tokens(
		/*id int NOT NULL AUTO_INCREMENT,
		PRIMARY KEY (id),*/
		user int NOT NULL UNIQUE,
		token VARCHAR(255),
		expires_at DATETIME,
		PRIMARY KEY (user),
		FOREIGN KEY (user) REFERENCES users(id)
	);`,
	
	
	`CREATE TABLE workspaces(
		id int NOT NULL AUTO_INCREMENT,
		owner int NOT NULL,
		name VARCHAR(255) NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		invitation_link VARCHAR(255),
		expires_at DATETIME,
		PRIMARY KEY (id),
		FOREIGN KEY (owner) REFERENCES users(id)
	);`,
	
	`CREATE TABLE channels(
		id int NOT NULL AUTO_INCREMENT,
		name VARCHAR(255) NOT NULL,
		description VARCHAR(255) NOT NULL,
		workspace int NOT NULL,
		public VARCHAR(255) DEFAULT('public'),
		invitation_link VARCHAR(255),
		expires_at DATETIME,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		PRIMARY KEY (id),
		FOREIGN KEY (workspace) REFERENCES workspaces(id)
	);`,

	`CREATE TABLE private_channels_members(
		channel int NOT NULL,
		member int NOT NULL,
		joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		PRIMARY KEY (channel, member),
		FOREIGN KEY (channel) REFERENCES channels(id),
		FOREIGN KEY (member) REFERENCES users(id)
	);`,
	
	`CREATE TABLE workspaces_members(
		/*id int NOT NULL AUTO_INCREMENT,*/
		workspace int NOT NULL,
		member int NOT NULL,
		joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		PRIMARY KEY (workspace, member),
		FOREIGN KEY (workspace) REFERENCES workspaces(id),
		FOREIGN KEY (member) REFERENCES users(id)
	);`,



	`CREATE TABLE users_users(
		id int NOT NULL AUTO_INCREMENT,
		sender int NOT NULL,
		reciever int NOT NULL,
		first_contact_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		PRIMARY KEY (id),
		FOREIGN KEY (sender) REFERENCES users(id),
		FOREIGN KEY (reciever) REFERENCES users(id)
	);`,
	
	`CREATE TABLE workspaces_colors(
		/*id int NOT NULL AUTO_INCREMENT,*/
		workspace int NOT NULL,
		color1 VARCHAR(255),
		color2 VARCHAR(255),
		color3 VARCHAR(255),
		color4 VARCHAR(255),
		color5 VARCHAR(255),
		color6 VARCHAR(255),
		PRIMARY KEY (workspace),
		FOREIGN KEY (workspace) REFERENCES workspaces(id)
	);`,
	
	`CREATE TABLE messages(
		id int NOT NULL AUTO_INCREMENT,
		sender int NOT NULL,
		channel int NOT NULL,
		message json,
		seen Boolean,    
		seen_at DATETIME,    
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		PRIMARY KEY (id),
		FOREIGN KEY (sender) REFERENCES users(id),
		FOREIGN KEY (channel) REFERENCES channels(id)
	);`,
	
	`CREATE TABLE private_messages(
		id int NOT NULL AUTO_INCREMENT,
		sender int NOT NULL,
		conversation int NOT NULL,
		message json,
		seen Boolean,    
		seen_at DATETIME,    
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		PRIMARY KEY (id),
		FOREIGN KEY (sender) REFERENCES users(id),
		FOREIGN KEY (conversation) REFERENCES users_users(id)
	);`,
	
	
	`CREATE TABLE blocks(
		blocker int NOT NULL,
		blocked int NOT NULL,
	
		FOREIGN KEY (blocker) REFERENCES users(id),
		FOREIGN KEY (blocked) REFERENCES users(id)
	);`,
	

	`create trigger add_channels_to_new_workspace after insert on workspaces for each row
	begin
	  	insert into channels(name, description, workspace, public) values ('general', 'room' ,new.id, true);
	  	insert into channels(name, description, workspace, public) values ('random', 'room' ,new.id, true);
	end#`,
	
	`create trigger add_self_chat after insert on users for each row
	begin
	  	insert into users_users(sender, reciever) values (new.id, new.id);
	end#`,

	`create trigger add_owner_as_member_to_workspace after insert on workspaces for each row
	begin
		insert into workspaces_members(workspace, member) values (new.id, new.owner);
	end#
	`,

]



tables.forEach(async element => {
	await query(element, (err, result) => {
		if(err){
			console.log(err)
			return
		}
	})
})

console.log('success')
//process.exit()