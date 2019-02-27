$(document).ready(function(){
    var captureEmail;//later in the form i am going to store the users email here and append it to an input form...
    //check if this page is linked...
    console.log('hello rukee append')
    $('#my-body').hide();
    $('#welcome-message').hide()
  
    //click on login submit button
    $('#button-login').click(function(){
        alert('rukee');
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
                        $('#welcome-message').show()
                        // and show form which contains appended data
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
                                
                                    //windows relocator...
                                    //window.location.replace("loan_page.html");
                            },
                            error: function(){
                                alert('error recovering data');
                            }   
                        });//the get request ends here....                  
                    }//an if statement ends here....
                } //a for loop ends here
                alert('Name not found');
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
        alert('we are tt')
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
                     $('#login-form').hide();
                        $('#my-body').show();
                        $('#welcome-message').show()
                   //we are doing another get request at this point...and appending the data
                          $.ajax({
                            type: "GET",
                            url: "http://localhost:3000/loanBucket",
                            success: function(response){
                                console.log(response)
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