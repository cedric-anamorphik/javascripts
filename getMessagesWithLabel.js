
function getMessagesWithLabel() {
  
  var date = new Date(),
      dateN = date.toDateString(),
      time = date.toLocaleTimeString();
  
  var messages = new Array();
  
  var threads = GmailApp.getUserLabelByName('LABEL').getThreads(1,20),
      n = threads.length;
  
  while ( n-- ) {
    var threadsMessages = threads[n].getMessages();
    
    for(var m in threadsMessages) {
      
      var msg = {
        "subject":threadsMessages[m].getSubject(),
        "body": threadsMessages[m].getBody()
      };
      
      messages.push( msg );
    }      
  }

 
  Logger.log(messages);
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getActiveSheet();
  
  sh.getRange(1,1).setValue('getMessagesWithLabel() '+time);
  sh.getRange(1,2).setValue('Subject');
  sh.getRange(1,3).setValue('Message');
  
  var l = 2;
  
  for ( m in messages ) {
    
    // sh.getRange(l,1).setValue();
    sh.getRange(l,2).setValue( messages[m].subject );
    sh.getRange(l,3).setValue( messages[m].body );
    l++;
  }
  
  // sh.getRange( ss.getLastRow()+1, 2, messages.length, messages[0].length ).setValues( messages[0] );
}

/*function stripTags ( html ) {
  var tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  var plain = tempDiv.innerText;
  tempDiv = null;
  return plain;
}*/

getMessagesWithLabel ();

