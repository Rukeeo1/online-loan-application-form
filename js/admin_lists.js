$(document).ready(function(){
    $('#home').click(function(){
        location.replace("./landing_page.html");
    });

    $('#log-out').click(function(){
        location.replace("./landing_page.html");
    });
    console.log('yes you got this')
    var divToAppend = document.getElementById('appended-data');

   
    
    //get function.
    $.ajax({
                                type: "GET",
                                url: "http://localhost:3000/loanBucket",
                                success: function(response){
                                    //console.log(response)
                                    var output = ''
                                    
                                  for(var i = 0; i<response.length;i++){
                                      output = `
                                            <tbody>
                                                <tr id="${response[i].id}" class="table-from-backend">
                                                    <td>${response[i].id}</td>
                                                    <td><span class="noedit email">${response[i].email}</span><input type="text" class="edit email" value="${response[i].email}"/> 
                                                    </td>
                                                    <td>
                                                        <span class="noedit bvn">${response[i].bvn}</span>
                                                        <input type="text" class="edit bvn" value="${response[i].bvn}"/>
                                                    </td>
                                                    <td>
                                                        <span class="noedit request-type">${response[i].requestType}</span>
                                                        <input type="text" class="edit request-type" value="${response[i].requestType}"/>
                                                    </td>
                                                    <td>
                                                        <span class="noedit loan-amount">${response[i].loanAmount}</span>
                                                        <input type="text" class="edit loan-amount" value="${response[i].loanAmount}"/>
                                                    </td>
                                                    <td>
                                                        <span class="noedit status">${response[i].status}</span>
                                                        <input type="text" class="edit status" value="${response[i].status}"/>
                                                    </td>
                                                    <td><button class="deleteBtn btn btn-danger">Delete</button></td>
                                                    <td>
                                                        <button data-toggle="modal" toggle-target="exampleModal" class="editBtn noedit btn btn-success" id="${response[i].id}">Edit</button>
                                                        <button class="saveEdit edit btn btn-success">Save</button>
                                                        <button class="cancelEdit edit btn btn-secondary">Cancel</button>
                                                    </td>
                                                    </tr> 
                                                </tbody>
            
                                                `
                                                // <td><button class="cancelEdit edit btn btn-secondary">Cancel</button></td>
                                                //     <td><button class="saveEdit edit btn btn-success">Save</button></td> 
                                                document.getElementById('my-table').innerHTML += output
                                      /*
                                      output = `
                                                <div class="from-backend jumbotron" id="${response[i].id}"
                                                    <p>
                                                        <strong>Email:</strong>
                                                        <span class="noedit email">${response[i].email}</span>
                                                        <input type="text" class="edit email"/>
                                                    </p>
                                                    <p>
                                                        <strong>BVN:</strong>
                                                        <span class="noedit bvn">${response[i].bvn}</span>
                                                        <input type="text" class="edit bvn"/>
                                                    </p>
                                                    <p>
                                                        <strong>Request Type:</strong>
                                                        <span class="noedit request-type">${response[i].requestType}</span>
                                                        <input type="text" class="edit request-type"/>
                                                    </p>
                                                    <p>
                                                        <strong>Amount:</strong>
                                                        <span class="noedit loan-amount">${response[i].loanAmount}</span>
                                                        <input type="text" class="edit loan-amount"/>
                                                    </p>
                                                    <p>
                                                        <strong>Status:</strong>
                                                        <span class="noedit status">${response[i].status}</span>
                                                        <input type="text" class="edit status"/>
                                                    </p>
                                                    <button class="deleteBtn btn btn-danger">Delete</button>
                                                    <button class="editBtn noedit btn btn-success" id="${response[i].id}">Edit</button>
                                                    <button class="cancelEdit edit btn btn-secondary">Cancel</button>
                                                    <button class="saveEdit edit btn btn-success">Save</button>
                                                </div>
                                                `
                                                */ 
                                               //my normal output ends above...
                                               /*
                                                    sample append

                                                    <tbody>
                                                    <tr id="${response[i].id}">
                                                        <td>${response[i].email}</td>
                                                        <td>${response[i].requestType}</td>
                                                        <td>${response[i].loanAmount}</td>
                                                        <td>${response[i].status}</td>
                                                    </tr>
                                            </tbody>

                                               */
                                                // console.log(output)
                                                // $('#appended-data').innerHTML += output;
                                                //  document.getElementById('appended-data').innerHTML += output
                                  }   
                                  
                                },
                                error: function(){
                                    alert('server error log-in in');
                                }   
                            });//get request ends here

                        
                //delete function...
                $('#my-table').delegate('.deleteBtn', 'click', function(){
                    // alert('this is delete');
                    //grab the target id for delete
                   // let deleteForDelete = $(this).closest('div').attr('id');
                   let deleteForDelete = $(this).closest('tr').attr('id');
                   console.log(deleteForDelete)
                    $.ajax({
                            type:"delete",
                            url:"http://localhost:3000/loanBucket/" +deleteForDelete,
                            success:function(response){
                                console.log('came here')
                                alert('successfully deleted');
                                //$(this).closest('div').remove();
                                location.reload();
                            },
                            error:function(response){
                                alert('delete operation failed');
                            }
                    });//delete ajax function ends
                });//delete function ends here....

                    
            //adding edit functionality...
            $('#my-table').delegate('.editBtn','click', function(){
                // console.log('edit')
                // alert(' this is edit')
                //let storeEditlId = $(this).closest('div').attr('data-id');
                var $tableRow = $(this).closest('tr');//onclick capturet the div that holds these guys
                // $div.find('input.email').val($div.find('span.email').html());
                // $div.find('input.bvn').val($div.find('span.bvn').html()); //grabs the persons drink and put in the empty input 
                // $div.find('input.request-type').val($div.find('span.request-type').html());
                // $div.find('input.loan-amount').val($div.find('span.loan-amount').html());
                // $div.find('input.status').val($div.find('span.status').html());
                $tableRow.addClass('edit');
            });
         //edit function goes up here....

         //cancel button
        $('#my-table').delegate('.cancelEdit', 'click', function(){
            // alert('testing to see');
            $(this).closest('tr').removeClass('edit');
        });

        //saveEdit button
        $('#my-table').delegate('.saveEdit', 'click', function(){
            // alert('this is save edit');
            var $div = $(this).closest('tr');
            // console.log($div);
            // var storeEditlId = $div.attr('id');

            
             var editedData =  {
                    "email": $div.find('input.email').val(),
                    "bvn": $div.find('input.bvn').val(),
                    "requestType": $div.find('input.request-type').val(),
                    "loanAmount":  $div.find('input.loan-amount').val(),
                    "status": $div.find('input.status').val()
            }
            
            
            console.log(editedData);
            console.log($(this).closest('tr').attr('id'));
            
            //::put request within the save button...
             $.ajax({
                    type: 'PUT',
                    url: "http://localhost:3000/loanBucket/" + $div.attr('id'),
                    data: editedData,
                    success: function(response){
                        alert('updated sucessfully');
                        document.location.reload()
                    },error: function(response){
                        alert('server error...update failed');
                    }
             });

             
             

        });
            
            //now capture the edit data and do a put request to the backend
            /*
         

            
            //put request for ajax ends above
            */

        
});

 