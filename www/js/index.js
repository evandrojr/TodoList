var taskList = Array();

function deleteTaskDB(key){
  taskList.remove(function(el) { return el.key == key; });
}

function toogleDoneDB(key){
  for(i=0; i < taskList.length; i++){
    if(taskList[i].key==key){
      if(taskList[i].done == false)
        taskList[i].done = true;
      else
        taskList[i].done = false;
    }
  }
}

function saveTasks(){
  if(window.localStorage){
    window.localStorage.setItem('taskList', JSON.stringify(taskList));
  }
}

$(document).ready(function(){
  var $newTaskInput = $('#newTaskInput');
  var $taskList = $('#taskList');
  var taskTouchStart;
  var taskTouchEnd;
  var taskTouchStartX;
  var taskTouchEndX;

  if(window.localStorage){
    taskList = JSON.parse(window.localStorage.getItem('taskList'));
  }

  if(taskList !== null){
    var newTask;
    for(i=0; i < taskList.length; i++){
      if(taskList[i].done == true)
        newTask = '<li class="done" data-key="' + taskList[i].key + '"><span>' + taskList[i].task + '</span></li>';
      else
        newTask = '<li data-key="' + taskList[i].key + '"><span>' + taskList[i].task + '</span></li>';
      $taskList.append(newTask);
    }
  }
  else{
    taskList = new Array();
  }


  $('#addNewTask').on('click', function(){
    var key = Date.now();
    var newTask = '<li data-key="' + key + '"><span>' + $newTaskInput.val() + '</span></li>';
    $taskList.append(newTask);
    taskList.push({key: key, task: $newTaskInput.val(), done: false});
    saveTasks();
    $newTaskInput.val('');
  });


  $("ol").delegate("li", "swiperight", function() {
  // The user has swiped to the right on a list view item. Show an edit menu.
    console.log("swiperight")
    var $this = $(this);
    $this.toggleClass('done');
    toogleDoneDB($this.attr('data-key'));
    saveTasks();
  })

  $("ol").delegate("li", "swipeleft", function() {
  // The user has swiped to the right on a list view item. Show an edit menu.
    console.log("swipeleft")
    var $this = $(this);
    $this.remove();
    deleteTaskDB($this.attr('data-key'));
    saveTasks();
  })

  // $taskList.on('touchstart', 'li', function(e){
  //   var start = document.elementFromPoint(e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY);
  //   taskTouchStart = $(start).attr('data-key');
  //   taskTouchStartX = e.originalEvent.touches[0].pageX;
  // });


  // $taskList.on('touchend', 'li', function(e){
  //   var $end;
  //   var $this = $(this);
  //   var end = document.elementFromPoint(e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY);
  //   $end = $(end);
  //   taskTouchEnd = $end.attr('data-key');
  //   taskTouchEndX = e.originalEvent.touches[0].pageX;
  //
  //   if(taskTouchStart == taskTouchEnd){
  //     if(taskTouchStartX < taskTouchEndX){
  //       $this.toggleClass('done');
  //       toogleDoneDB(taskTouchStart);
  //     }
  //     if(taskTouchStartX > taskTouchEndX){
  //       $this.remove();
  //       deleteTaskDB(taskTouchStart);
  //     }
  //     saveTasks();
  //   }
  //
  // });


});
