export function refreshWindow () {

	let blurDate = new Date();
    let focusDate = {}

	window.addEventListener('focus', (event) => { 
	  focusDate = new Date()
	  const seconds = (focusDate.getTime() - blurDate.getTime()) / 1000;
	  console.log(seconds)
	  console.log(event)
	  if (seconds > 1800) {
	    location.reload();
	  }
	  const date = new Date();
	  console.log(date);
	  
	});

	window.addEventListener('blur', (event) => { 
	  console.log(event)
	  blurDate = new Date();
	  console.log(blurDate);
	
	});
}