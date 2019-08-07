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
                                                    <div class="row" id="buttoned">
                                                    <button type="button" id="request-loan" class="btn btn-primary" data-toggle="modal" data-target="#mymodal">Update</button>
                                                    </div>
                                                    </td>
                                                    </tr> 
                 
      
              <div class="modal fade" id="mymodal">
                  <div class="modal-dialog modal-dialog-scrollable">
                      <div class="modal-content">
                          <div class="modal-header">
                              <h3>Edit Form</h3><br>
                          </div>
                          <div class="modal-body">
                                  <p>Please fill the form below to make a request</p>
                                  <input type="text" id="request-email" placeholder="Email" class="form-control" required><br>
                                  <input type="text" id="request-bvn" placeholder="BVN" class="form-control"><br>
                                  <input type="text" id="request-nature" placeholder="Nature Of Request" class="form-control"><br>
                                  <input type="text" id="request-Amount" placeholder="Amount" class="form-control"><br>
                                  <select id="status" class="form-control"><option>Approved</option><option>Declined</option><option>Under Consideration</option></select>          
                                  </div>
                          <div class="modal-footer">
                                  <button id="" class="btn btn-primary" data-dismiss="modal">Close</button>
                                  <button id="submit-request" class="btn btn-primary">Submit</button>
                          </div>
      
                      </div>
      
                  </div>
              </div>
                                                </tbody>
            
                                                `
                                                // <td><button class="cancelEdit edit btn btn-secondary">Cancel</button></td>
                                                //     <td><button class="saveEdit edit btn btn-success">Save</button></td> 
                                                document.getElementById('my-table').innerHTML += output
                                         }   //forloopends here...
                                  
                                },
                                error: function(){
                                    alert('server error log-in in');
                                }   
                            });//get request ends here

                        
                //delete function...
                $('#my-table').delegate('.deleteBtn', 'click', function(){
                    alert('this is delete');
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
                alert(' this is edit')
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
            alert('this is save edit');
            var $div = $(this).closest('tr');
            // console.log($div);
            // var storeEditlId = $div.attr('id');

            
            //  var editedData =  {
            //         "email": $div.find('input.email').val(),
            //         "bvn": $div.find('input.bvn').val(),
            //         "requestType": $div.find('input.request-type').val(),
            //         "loanAmount":  $div.find('input.loan-amount').val(),
            //         "status": $div.find('input.status').val()
            // }

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

 