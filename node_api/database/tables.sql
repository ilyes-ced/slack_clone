/*
*   must learn indexing
*
*
*   must learn joins
*
*
*   must learn triggers
*/


CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    phone_number VARCHAR(255),
    profile_image VARCHAR(255),

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login DATETIME,

    PRIMARY KEY (id)
)
CREATE TABLE verifications(
    id int NOT NULL AUTO_INCREMENT,
    user int NOT NULL,
    email_verified Boolean,
    email_verification_code VARCHAR(255),
    is_active Boolean,

    FOREIGN KEY (user) REFERENCES users(id),
    PRIMARY KEY (id)
)
CREATE TABLE notifications(
    id int NOT NULL AUTO_INCREMENT,
    user int NOT NULL,
    sender int NOT NULL,

    FOREIGN KEY (sender) REFERENCES users(id),
    FOREIGN KEY (user) REFERENCES users(id),
    PRIMARY KEY (id)
)
CREATE TABLE tokens(
    id int NOT NULL AUTO_INCREMENT,
    user int NOT NULL,
    token VARCHAR(255),
    expires_at DATETIME,
    PRIMARY KEY (id)
)














CREATE TABLE workspaces(
    id int NOT NULL AUTO_INCREMENT,
    owner int NOT NULL,
    name VARCHAR(255) NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    invitation_link VARCHAR(255),
    expires_at DATETIME,

    PRIMARY KEY (id),
    FOREIGN KEY (owner) REFERENCES users(id),
)

CREATE TABLE channels(
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255), /*groupe or 1-1*/
    workspace int NOT NULL,

    public Boolean,
    invitation_link VARCHAR(255),
    expires_at DATETIME,


    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    FOREIGN KEY (workspace) REFERENCES workspace(id),
)

CREATE TABLE channels-members{
    id int NOT NULL AUTO_INCREMENT,
    channel int NOT NULL,
    member int NOT NULL,

    joined_at DATETIME,

    PRIMARY KEY (id),
    FOREIGN KEY (channel) REFERENCES channel(id),
    FOREIGN KEY (member) REFERENCES users(id),
}

CREATE TABLE users-users{
    id int NOT NULL AUTO_INCREMENT,
    sender int NOT NULL,
    reciever int NOT NULL,

    first_contact_at DATETIME,

    PRIMARY KEY (id),
    FOREIGN KEY (sender) REFERENCES users(id),
    FOREIGN KEY (reciever) REFERENCES users(id),
}

CREATE TABLE workspaces-colors{
    id int NOT NULL AUTO_INCREMENT,
    workspace int NOT NULL,
    color1 VARCHAR(255),
    color2 VARCHAR(255),
    color3 VARCHAR(255),
    color4 VARCHAR(255),
    color5 VARCHAR(255),
    color6 VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (workspace) REFERENCES workspace(id),
}

CREATE TABLE messages{
    id int NOT NULL AUTO_INCREMENT,
    sender int
    channel int NOT NULL,
    message VARCHAR(255),
    seen Boolean,    

    seen_at DATETIME,    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    FOREIGN KEY (sender) REFERENCES users(id),
    FOREIGN KEY (channel) REFERENCES channel(id),
}







CREATE INDEX NAME_OF_INDEX ON table_name(cols)