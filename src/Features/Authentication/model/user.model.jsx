export class User{
    constructor(data, operation){
        this.operation=operation;//signup or signin
        this.username=data.username;
        this.email=data.email||'';
        this.password=data.password;
        this.gender=data.gender||'';
        this.phonenumber=data.phonenumber||'';
        this.bio=data.bio||'';
        this.name=data.name||'';
        this.age=data.age||'';
        this.profilepic=data.profilepic||'';
        this.otp=data.otp||'';
        this.jwttoken=data.jwttoken||'';

    }
    //validate input based on operation
    validate(){
        if(this.operation=='signup'){
            return (
                this.username.length>0&&
                this.email.include('@')&&
                this.password.length>0&&
                this.gender.length>0&&
                this.phonenumber.length>0||
                this.name.length>0||
                this.age.length>0||
                this.bui.length>0||
                this.profilepic.length>0

            )
        }else if(this.operation=='signin'){
            return (
                this.username.length>0&&
                this.password.length>0
            )
        }else if(this.operation=='verify'){
            return (
                this.username.length>0&&
                this.otp.length>0
            )
        }else if(this.operation=='validate'){
            return(
                this.jwttoken.length>0
            )
        }else if(this.update){

        }

    
    }
}