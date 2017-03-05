var game=	{
	
		data:null,//保存数字的二维数组
		RN:4,CN:4,//总行数，总列数
		//强调
		//1.对象自己的方法要使用对象自己的属性，必须加this
		//2.对象的每个成员之间必须用逗号分隔
		score:0,
		status:1,
		GAMEOVER:0,
		RUNNING:1,
		start(){
		//启动游戏
			this.status=this.RUNNING;

			this.score=0
			//生成数组
			this.data=[];
			for(var r=0;r<this.RN;r++){	
				this.data[r]=[];
				for(var c=0;c<this.CN;c++){
					this.data[r][c]=0;
				}
			}
			this.randomNum();this.randomNum();
			this.updateView();
			//console.log(this.data.join("\n"));

			document.onkeydown=function(e){
				//alert(e.keyCode);
				switch(e.keyCode){
					case 37:this.moveLeft();break;
					case 38:this.moveUp();break;
					case 39:this.moveRight();break;
					case 40:this.moveDown();break;

				}

			
			
			}.bind(this);


		},
		randomNum(){
			while(true){
			
				//在随机的一个位置生成2或4
				//在0~RN-1随机生成行号r
				var r=Math.floor(Math.random()*this.RN);
				var c=Math.floor(Math.random()*this.CN);
				if (this.data[r][c]==0){	
				//在随机的一个空位置生成2或4
					this.data[r][c]=Math.random()<0.5?2:4;
					break;//退出循环
				}
			}	
		},
		updateView(){	
			for (var r=0;r<this.RN ;r++ ){
				for (var c=0;c<this.CN ;c++ ){
					var div=document.getElementById("c"+r+c);
					if(this.data[r][c]!=0){
						div.innerHTML=this.data[r][c];
						div.className="cell n"+this.data[r][c];
					}else{
						div.innerHTML="";
						div.className="cell";
					
						}

				}
			}
			document.getElementById("score")
							.innerHTML=this.score;
			var div=document.getElementById("gameover");
			if(this.status==this.GAMEOVER){
				document.getElementById("final")
								.innerHTML=this.score;
				div.style.display="block";
			}else{
				div.style.display="none";
			}
		},

		isGameOver(){
			for (var r=0;r<this.RN ;r++ ){
				for(var c=0;c<this.CN;c++){
					if(this.data[r][c]==0)
						return false;
					if(c<this.CN-1
						&&this.data[r][c]==this.data[r][c+1])
						return false;
					if (r<this.RN-1
						&&this.data[r][c]==this.data[r+1][c])
						return false;
					
				}
			
			}
			return true;
		
		
		
		
		},

		moveLeft(){
			var before=String(this.data);
			for (var r=0;r<this.RN ;r++ ){
				this.moveLeftInRow(r);
			}
			var after=String(this.data);
			if (before!=after){
				this.randomNum();
				if(this.isGameOver())
					this.status=this.GAMEOVER;
				this.updateView();
				
			}
		},
		moveRight(){
			var before=String(this.data);
			for (var r=0;r<this.RN ;r++ ){
				this.moveRightInRow(r);
			}
			var after=String(this.data);
			if (before!=after){
				this.randomNum();
				if(this.isGameOver())
					this.status=this.GAMEOVER;
				this.updateView();
				
			}
		},

		moveUp(){
			var before=String(this.data);
			for (var c=0;c<this.CN ;c++ ){
				this.moveUpInCol(c);
			}
			var after=String(this.data);
			if (before!=after){
				this.randomNum();
				if(this.isGameOver())
					this.status=this.GAMEOVER;
				this.updateView();
				
			}
		},
		moveDown(){
			var before=String(this.data);
			for (var c=0;c<this.CN ;c++ ){
				this.moveDownInCol(c);
			}
			var after=String(this.data);
			if (before!=after){
				this.randomNum();
				if(this.isGameOver())
					this.status=this.GAMEOVER;
				this.updateView();
				
			}
		},



		moveLeftInRow(r){
			for (var c=0;c<this.CN-1 ;c++ ){
				var nextc=this.getNextInRow(r,c);
				if (nextc!=-1){
					if (this.data[r][c]==0){
						this.data[r][c]=this.data[r][nextc];
						this.data[r][nextc]=0;
						c--;
					}else if(
						this.data[r][c]==this.data[r][nextc]){
						this.data[r][c]*=2;
						this.score+=this.data[r][c];
						this.data[r][nextc]=0;
					}
				}else break;

			}
		},
		moveRightInRow(r){
			for (var c=this.CN-1;c>0 ;c-- ){
				var prevc=this.getPrevInRow(r,c);
				if (prevc!=-1){
					if (this.data[r][c]==0){
						this.data[r][c]=this.data[r][prevc];
						this.data[r][prevc]=0;
						c++;
					}else if(
						this.data[r][c]==this.data[r][prevc]){
						this.data[r][c]*=2;
						this.score+=this.data[r][c];
						this.data[r][prevc]=0;
					}
				}else break;

			}
		},


		moveUpInCol(c){
			for (var r=0;r<this.RN-1 ;r++ ){
				var nextr=this.getNextInCol(r,c);
				if (nextr!=-1){
					if (this.data[r][c]==0){
						this.data[r][c]=this.data[nextr][c];
						this.data[nextr][c]=0;
						r--;
					}else if(
						this.data[r][c]==this.data[nextr][c]){
						this.data[r][c]*=2;
						this.score+=this.data[r][c];
						this.data[nextr][c]=0;
					}
				}else break;

			}
		},
		moveDownInCol(c){
			for (var r=this.RN-1;r>0 ;r-- ){
				var prevr=this.getPrevInCol(r,c);
				if (prevr!=-1){
					if (this.data[r][c]==0){
						this.data[r][c]=this.data[prevr][c];
						this.data[prevr][c]=0;
						r++;
					}else if(
						this.data[r][c]==this.data[prevr][c]){
						this.data[r][c]*=2;
						this.score+=this.data[r][c];
						this.data[prevr][c]=0;
					}
				}else break;

			}
		},
		getNextInRow(r,c){
			for (var i=c+1;i<this.CN ;i++ ){
				if(this.data[r][i]!=0) return i;
			}
			return -1;
		},
		getPrevInRow(r,c){
			for (var i=c-1;i>=0 ;i-- ){
				if(this.data[r][i]!=0) return i;
			}
			return -1;
		},
		getNextInCol(r,c){
			for (var i=r+1;i<this.RN ;i++ ){
				if(this.data[i][c]!=0) return i;
			}
			return -1;
		},
		getPrevInCol(r,c){
			for (var i=r-1;i>=0 ;i-- ){
				if(this.data[i][c]!=0) return i;
			}
			return -1;
		},

	
	}
	game.start();
