$(document).ready(function(){
    $('#home').click(function(){
        location.replace("./landing_page.html");
    });

    $('#log-out').click(function(){
        location.replace("./landing_page.html");
    });

    $('#admin').click(function(){
        location.replace("./landing_page.html");
    });


    
    //we are trying to enable a login for the admin....
     $('#button-login').click(function(){
            alert('hello admin')
            //now we have attached a click event to the btn
            //now lets capture data
            var adminEmail = $('#admin-email').val();
            var adminPassword = $('#admin-password').val();
            console.log(adminEmail);
            console.log(adminPassword);

            var admin = {
                email : adminEmail,
                password: adminPassword 
            }

            if(adminEmail == '' || adminPassword == ''){
                alert('input fields cannot be empty')
            }else{
                    $.ajax({
                                type: "GET",
                                url: "http://localhost:3000/admin",
                                success: function(response){
                                    if(response[0].password == adminPassword ){
                                        alert('login sucessful');
                                        window.location.replace('./admin_lists.html');
                                    }else{
                                        alert('please check email and password')
                                    }       
                                },
                                error: function(){
                                    alert('server error log-in in');
                                }   
                            });//the get request ends here....  
            }//closing for else statement....
     });//button-login ends here...

     //i just added a home relocation button here...migth add log out too
   

});