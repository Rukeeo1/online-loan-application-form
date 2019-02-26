console.log('hello');
$(document).ready(function(){
   
    $('#login-form').hide();//hides login box
    //have an account already? sign-up?
    $('#login').click(function(){//this login button shows the login form 
        $('#login-form').show();
        $('#actual-registration-form').hide();
       // alert('hellow')
    });

    //dont have an account and want to register....
    $('#register').click(function(){//this button shows the registration form
        $('#login-form').hide();
        $('#actual-registration-form').show();
        //alert('hellow')
    });
    
    //attaching an event to the submit button....
    $('#submitButton').click(function(){

        let email = $('#Email').val();
        let mobile = $('#mobile-number').val();
        let bvn = $('#bvn').val();
        let dateOfBirth = $('#date-of-birth').val();
        let password = $('#password').val();
        let confirmPassword =  $('#confirm-password').val();

        //verifies and ensures that no input field is empty
        if(email == '' || mobile == '' || bvn == '' || dateOfBirth == '' || password == '' || confirmPassword !== password){
            //verify that those guys are not empty
            alert('please ensure all fields are filled correctly');
        }else{
            //submit details to backend
            var loanApplicant = {// an object that captures data
                email: email,
                mobile: mobile,
                bvn : bvn,
                dateOfBirth: dateOfBirth,
                password: password
            }
            //my post request is below...
            $.ajax({
                type: 'POST',
                url: "http://localhost:3000/loanApplicants",
                data: loanApplicant ,
                success: function(newOrder){
                    alert('sucessfully posted');
                   // console.log('loanApplicant');
                },
                error: function(){
                    alert('error saving data');
                }      
            });//ajax post request ends here...
            
        }//else statement ends here...
    });//submit button ends here...

    //lets try the login concept...attached an event to the login button...
    $('#button-login').click(function(){
        alert('rukee');
        //loop through data base to ensure that name exist....
        //to do this we need a get request...
        //a get request to the normal the loanApplicant and ensure the guy has signed up
        //also we need to get the entered password and email
        var userEmail = $('#email-login').val() ;
        var userPassword =$('#login-password').val();
        console.log(userEmail);
        console.log(userPassword);
    

        $.ajax({
            type: "GET",
            url: "http://localhost:3000/loanApplicants",
            success: function(response){
                //console.log(response)
                var backEndOutput;
                for(i = 0;i<response.length;i++){
                    console.log(response[i].password);//this guy is given me all the emails...
                    if(userEmail == response[i].email && userPassword == response[i].password){
                        alert('name correct');
                        //do a get request...to loan bucket
                        //post persons data to new page...then relocate
                        $.ajax({
                            type: "GET",
                            url: "http://localhost:3000/loanBucket",
                            success: function(response){
                                console.log(response)
                                var output;
                                for(i = 0;i<response.length;i++){
                                    // console.log(response[i].email)
                                    if(userEmail == response[i].email){
                                        console.log(response[i].requestType);
                                    }
                                   
                                    let output;
                                    // output = `
                                    //         <div class="returned-div">
                                    //             <p>${response[i].firstName}
                                    //             <p><span>Name: </span>${response[i].firstName} + ' ' + ${response[i].lastName} + ' ' +${response[i].level} </p>
                                    //         </div>
                                    // `
                                    // appendToDiv.innerHTML += output;
                                    // document.getElementById('contain').innerHTML += output
                                }//a for loop ends here...        
                            },
                            error: function(){
                                alert('error recovering data');
                            }   
                        });//the get request ends here....
                    
                        //windows relocator...
                        // window.location.href = 'loan page.html';
                        window.location.replace("js\loan_page.html");
                    
                    }//an if statement ends here....
                } //a for loop ends here
                alert('Name not found');
            },
            error: function(){
                alert('error recovering data');
            }   
        });//get request ends here
        

        



    });//button - click function ends here....

  

   

    
});
