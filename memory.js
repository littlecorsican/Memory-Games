
let memoryObj = {
    rows : 8,
    cols : 8,
    num_of_sequence : 5,
    started : false,
    plate_count : 0,
    sequence : [],
    userSequence : [],

    
    init : function(divDOM) {
        divDOM.innerHTML = ""; // clear everything out first

        for (let i =0; i < this.rows; i ++) {
            for (let o =0; o < this.cols; o ++) {
                this.plate_count += 1;
                let plate_width = 95/this.cols;
                let plate_height = 95/this.rows;
                let plate = document.createElement("div");
                plate.className = "plate";
                plate.style.width = plate_width + "%";
                plate.style.height = plate_height + "%";
                plate.style.border = "1px solid black"
                plate.setAttribute('id', this.plate_count);
                divDOM.appendChild(plate);
            } 
        }        
    },

    reset : function() {
        for (let i =0;i<this.userSequence.length;i++) {
          $("#"+this.userSequence[i]).css("backgroundColor" , "white");
        }
        this.userSequence = [];
        this.sequence = []; 
        this.started = false;
        
    },

    plate_mouseover : function(plate) {
        if (this.started && !this.userSequence.includes(parseInt(plate.id))) {
            plate.style.backgroundColor  = "grey";
        }
    },

    plate_mouseout : function(plate) {
        if (this.started && !this.userSequence.includes(parseInt(plate.id))) {
            plate.style.backgroundColor  = "white";
        }
        
    },
    plate_click : function(plate) {
        if (this.started) {
            plate.style.backgroundColor  = "blue";
            this.userSequence.push(parseInt(plate.id));
            this.checkResult();
        }
    },

    checkResult : function() {
        for (let i =0; i < this.userSequence.length;i++) {
            if (this.sequence[i] !== this.userSequence[i]) {
                this.gameover();
                return
            }
            
        }
        if (this.sequence.length === this.userSequence.length) {
            this.win();
        }
        
    },

    gameover : function() {
        this.started = false;
        alert("game over")
    },

    win : function() {
        this.started = false;
        alert("you win")
    },

    checkDuplicate : function(n) {
        for (let i =0; i < this.sequence.length;i++) {
            if (this.sequence[i] == n) {
                return true;
            }
        }
        return false;
    },

    generateSequence : function() {
        this.sequence = [];
        for (let i =0; i < this.num_of_sequence; i ++) {
            let n = 0;
            do {
                n = Math.round(Math.random() * this.plate_count);
            }
            while ( this.checkDuplicate(n) == true ) ; 

            this.sequence.push(n);
        }
    },

    displaySequence : function() {
        if (this.sequence.length > 0) {
            let i = 0;
            let o = 0 ;

            let fadeOut = function() {
                $(memoryObj.sequence).each(function(index, key) {
                    $("#"+key).animate({opacity:"0"}, 2000, restore);
                });
            };

            let restore = function() {
                o += 1;
                if (o == memoryObj.sequence.length) {
                    $(memoryObj.sequence).each(function(index, key) {
                        $("#"+key).css("backgroundColor", "white");
                        $("#"+key).css("opacity", 1);
                    });
                    memoryObj.started = true;
                }
                
            }

            let fadeIn = function() {
                if (i == memoryObj.sequence.length) {
                    fadeOut();
                } else {
                    $("#"+memoryObj.sequence[i]).css("backgroundColor", "blue");
                    $("#"+memoryObj.sequence[i]).css("opacity", 0);
                    $("#"+memoryObj.sequence[i]).animate({opacity:"1"}, 2000, fadeIn);
                    i += 1
                }
            }
            fadeIn();

            
        }
    }

}
