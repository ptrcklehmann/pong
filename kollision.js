	function kollision(a,b){
		if(a.x < b.x + b.w  && 
			a.x + a.w > b.x &&
			a.y < b.y + b.h &&
			a.h + a.y > b.y) {
			return true;
		}else{
			return false;
		};
	};	
	