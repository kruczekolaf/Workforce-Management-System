function trigger_annually() {

  const today = new Date();
  if (today.getDate() === 1 && today.getMonth() === 0) { 
    console.log("Today is January 1. Script is executed.");
    target_holidays(); 
  } else {
    console.log("Not January 1st. Script is not executed.");
  }
}
