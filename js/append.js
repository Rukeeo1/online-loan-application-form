$(document).ready(function(){
    var array = [];
    $('#register').click(function(){
        location.replace("./landing_page.html");
    });
    //home button
    $('#home').click(function(){
        location.replace("./landing_page.html");
    });
    //admin button
    $('#admin').click(function(){
        location.replace("./admin_login.html");
    });
     //log-out
    $('#log-out').click(function(){
        location.replace("./landing_page.html");
    });

    //request a loan...button below
    $('#request-loan').click(function(){
        alert('hello request...');
        $('#form-div').show();
        //i want to be able to show form
    });
    //request a loan button above
  
    var captureEmail;//later in the form i am going to store the users email here and append it to an input form...
  
    //the following are hidden when the page first loads...
    $('#my-body').hide();
    $('#welcome-message').hide();
    $('#welcome-message').hide();
    $('#log-out').hide();
    $('#request-loan').hide();
    $('#form-div').hide();
    $('#form-div').hide();


  
    //click on login submit button
    $('#button-login').click(function(){
        //loop through data base to ensure that name exist....
        //to do this we need a get request...
        //a get request to the normal the loanApplicant and ensure the guy has signed up
        //also we need to get the entered password and email
        var userEmail = $('#email-login').val() ;
        var userPassword =$('#login-password').val();
        // console.log(userEmail);
        // console.log(userPassword);
    
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
                        //at this point login is succesful so we can hide loin form
                        $('#login-form').hide();
                        $('#my-body').show();
                        $('#welcome-message').show();
                        $('#request-loan').show();
                         $('#log-out').show();
                       // $('#form-div').show();//maybe i might remove this guy and create an actual function

                        // and show form which contains appended data
                        //do a get request...to loan bucket
                        //post persons data to new page...then relocate
                        $.ajax({
                            type: "GET",
                            url: "http://localhost:3000/loanBucket",
                            success: function(response){
                                console.log(response)
                                // var array = [];//added this 28.
                                var output;
                                for(i = 0;i<response.length;i++){
                                    // console.log(response[i].email)
                                    if(userEmail == response[i].email){
                                        array.push(Number(response[i].loanAmount));
                                           // console.log(response[i].requestType);
                                            let output;
                                        output = `
                                            <tbody>
                                                    <tr id="${response[i].id}">
                                                    <td>${response[i].email}</span></td>
                                                        <td>${response[i].requestType}</td>
                                                        <td>${response[i].loanAmount}</td>
                                                        <td>${response[i].status}</td>
                                                    </tr>
                                            </tbody>
                                        
                                                `
                                        console.log(output);
                                        $('#welcome-message').innerHTML += output
                                       // document.getElementById('welcome').innerHTML += output
                                        document.getElementById('me').innerHTML += output
                                        document.getElementById('welcome-span').innerHTML = response[i].email
                                        //assigning email to a global variable here so i can use it again...
                                        captureEmail = response[i].email;
                                        console.log(captureEmail);
                                    }
                                   
                                    
                                }//a for loop ends here...      
                                    //added here
                                    document.getElementById('green').innerHTML = "=N=" + array.reduce((a,b)=> a + b,0);
                                    //windows relocator...
                                    //window.location.replace("loan_page.html");
                            },
                            error: function(){
                                alert('error recovering data');
                            }   
                        });//the get request ends here....                  
                    }//an if statement ends here....
                } //a for loop ends here
                alert('Please Check your Email and Password');
            },
            error: function(){
                alert('error recovering data');
            }   
        });//get request ends here
    
    });//login-button - click function ends here....
    // console.log($('#request-email').val($('#welcome-span').html()));

    //function that submits the make a request after the user has signed up...
    $('#submit-request').click(function(){
        // e.preventDefault();
        alert('Loan Request was Succesful');
         var requestEmail = $('#request-email').val();
         var requestBvn =$('#request-bvn').val();
         var requestType =$('#request-nature').val();
         var requestAmount =$('#request-Amount').val();

        //  let requestObj = {
        //      requestEmail:requestEmail,
        //      requestBvn:requestBvn,
        //      requestType:requestType,
        //      requestAmount:requestAmount,
        //      status:"under consideration"
        //  }
        //  console.log(requestObj);

        let requestObj = {
            email:requestEmail,
            bvn:requestBvn,
            requestType:requestType,
            loanAmount:requestAmount,
            status: "under consideration",

        }
         //making a post request to loanBucket...
         $.ajax({
                type: 'POST',
                url: "http://localhost:3000/loanBucket",
                data: requestObj,
                success: function(response){
                    alert('Loan Request Successful');
                    console.log(response);
                    //i am manipulating this part of the code...28th...02
                    array.push(Number(response.loanAmount));//added this onthe first

                             let output;
                                        output = `
                                            <tbody>
                                                    <tr id="${response.id}">
                                                        <td>${response.email}</td>
                                                        <td>${response.requestType}</td>
                                                        <td>${response.loanAmount}</td>
                                                        <td>${response.status}</td>
                                                    </tr>
                                            </tbody>
                                        
                                                `
                                    document.getElementById('me').innerHTML += output;
                                    // var x
                                    document.getElementById('green').innerHTML = "=N=" + array.reduce((a,b)=> a + b,0);
                                    document.getElementById('welcome-span').innerHTML = response.email
                                    
                      //i am manipulating the above part of the code...28th...02
                     $('#login-form').hide();
                        $('#my-body').show();
                        $('#welcome-message').show();
                   //we are doing another get request at this point...and appending the data
                          $.ajax({
                            type: "GET",
                            url: "http://localhost:3000/loanBucket",
                            success: function(response){
                                //console.log(response)
                                var output;
                                for(i = 0;i<response.length;i++){
                                    // console.log(response[i].email)
                                    if(requestEmail == response[i].email){
                                           // console.log(response[i].requestType);
                                            let output;
                                        output = `
                                            <tbody>
                                                    <tr id="${response[i].id}">
                                                        <td>${response[i].email}</td>
                                                        <td>${response[i].requestType}</td>
                                                        <td>${response[i].loanAmount}</td>
                                                        <td>${response[i].status}</td>
                                                    </tr>
                                            </tbody>
                                        
                                                `
                                        //console.log(output);
                                        $('#welcome-message').innerHTML += output;
                                       // document.getElementById('welcome').innerHTML += output
                                       // document.getElementById('me').innerHTML += output//comented this out
                                        document.getElementById('welcome-span').innerHTML = response[i].email
                                        //assigning email to a global variable here so i can use it again...
                                        captureEmail = response[i].email;
                                        console.log(captureEmail);
                                    }
                                   
                                    
                                }//a for loop ends here...      
                                
                                    //windows relocator...
                                    //window.location.replace("loan_page.html");
                            },
                            error: function(){
                                alert('error recovering data');
                            }   
                        });//the get request ends here.... 
                    //** *
                   //above ...we are doing another get request....
                },
                error: function(){
                    alert('Server error making request');
                }      
            });//ajax post request ends here...
            



        //  console.log(requestObj);

    });


  console.log(captureEmail);
    // document ready function ends here
});