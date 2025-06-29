const canvas = {height:600, width:1000};
// const pos_my = height - 60;

var field;

var game;

//コマの種類
const black = 1;
const white = 2;

const kouho = 10;
const hole = -1;
const none = 0;
const dummy = -10;
const dummy_p = -20;

//ゲームシーン
const Sgame = 0;
const Smenu = 1;
const Sspecial = 2;

//ゲームギミック
const P_Blind = 0;

function setup(){
    createCanvas(canvas.width, canvas.height);
    background(150);

    // field = new Field(10, 10);
    game = new Game_scene;
    
}

function draw(){
    background(200);

    // field.move();

    // field.show();
    game.show();
    
}

//マウスイベント
function mouseClicked(){
    // field.click_mass();
    game.click_field();
}

//キーボードイベント
// function keyPressed(){
//     if(key == 'a'){

//     }
// }

// function keyReleased() {
//     if(key == 'a'){

//     }
// }


function ransu(min,max){
    return parseInt(Math.random() * (max - min) + min);
}
function ransu_double(min,max){
    return Math.random() * (max - min) + min;
}

class Vec {
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }
}

class Ball{
    constructor(_size){
        this.pos = new Vec;
        this.size = new Vec(_size, _size);
    }
}

class Rect{
    constructor(_w, _h){
        this.pos = new Vec;
        this.size = new Vec(_w, _h);
    }

    get left(){
        return this.pos.x - this.size.x / 2;
    }
    get right(){
        return this.pos.x + this.size.x / 2;
    }
    get top(){
        return this.pos.y - this.size.y / 2;
    }
    get bottom(){
        return this.pos.y + this.size.y / 2;
    }
    touch_rect(){
        if((mouseX > this.left 
            && mouseX < this.right)
            && (mouseY > this.top
            && mouseY < this.bottom)){
                return true;
        }
        else{
            return false;
        }
    }
}
class Player_set{
    constructor(_com){
        this.com = _com;
    }
}

class Player extends Rect{
    constructor(_color, _x, _y){
        super(200, 150)
        this.com = 0;
        this.pos.x = _x;
        this.pos.y = _y;
        this.color = _color;
        this.line_color = "black";
        this.mai = 0;
        this.komaper = 0;
        this.Kcolor = "gray";
        this.Kline_color= "black";

        this.info_color = "white";
        this.info_line_color  = "black";
    }

    Info_show(num, BW, end, ano){
        fill(this.info_color);
        strokeWeight(1);
        stroke(this.info_line_color );
        rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
        textAlign(LEFT, BOTTOM);
        if(end == 2){
            if(this.mai > ano.mai){
                textSize(20);
                fill(0);
                text("You Win!!", this.pos.x+20,this.pos.y+25);
            }
            else if(this.mai < ano.mai){
                textSize(20);
                fill(0);
                text("You Lose", this.pos.x+20,this.pos.y+25);
            }
            else if(this.mai == ano.mai){
                textSize(20);
                fill(0);
                text("draw", this.pos.x+20,this.pos.y+25);
            }
        }
        else if(num == BW){
            textSize(20);
            fill(0);
            text("Your Turn", this.pos.x+20,this.pos.y+25);
        }

        fill(this.color);
        strokeWeight(1);
        stroke(this.line_color);
        ellipse(this.pos.x+30, this.pos.y+40+10, 40, 40);

        textSize(30);
        fill(0);
        text(this.mai+"枚", this.pos.x+60,this.pos.y+50+10);


    }
}
class Gage extends Rect{
    constructor(){
        super(500, 40);
        this.pos.x = canvas.width / 2;
        this.pos.y = canvas.height - 20;
    }
    show(player){
        var total = this.total(player) ;
        var pos_xx = 0;
        var sen = [];
        // if(total != 0){
        for(var i=0; i<player.length; i++){
            // console.log("a");
            if(i == 0){
                stroke(0)
                fill(player[i].color);
                // rect(pos_xx, this.top, this.size.x * (player[i].mai / total), this.size.y);
                rect(this.left, this.top, this.size.x * this.setPer(i,player,total), this.size.y);
                pos_xx = this.left + this.size.x * (player[i].mai / total);
                sen[i] = pos_xx;
            }
            else{
                stroke(0)
                fill(player[i].color);
                // rect(pos_xx, this.top, this.size.x * (player[i].mai / total), this.size.y);
                rect(this.right, this.top, -this.size.x * this.setPer(i,player,total), this.size.y);
                sen[i] = pos_xx;
            }
        }
        for(var i=0; i<sen.length-1; i++){
            stroke("black");
            strokeWeight(1);
            line(pos_xx, this.top, pos_xx, this.bottom);
        }
        //ライン描画
        stroke("black");
        strokeWeight(1);
        noFill()
        rect(this.left, this.top, this.size.x , this.size.y);
        // }
    }
    setPer(i,player,total){
        if((player[i].mai / total) <= 1){
            return (player[i].mai / total)
        }
        else {
            return 1;
        }
    }
    total(player){
        var play = 0;
        for(var i = 0; i < player.length; i++){
            play +=  Math.abs(player[i].mai);
        }
        if(play == 0){
            return 0;
        }
        return Math.abs(play);
    }
}

class Mass extends Rect{
    constructor(_x, _y){
        super(100,100);
        this.pos.x = _x;
        this.pos.y = _y;

        this.mass_color = "green";
        this.touch_color = "#00FF00";
        this.line_color = "black";
    }
    show(){
        if(this.touch_rect()){
            fill(this.touch_color);
        }
        else{
            fill(this.mass_color);
        }
        stroke(this.line_color);
        strokeWeight(1);

        rect(this.left, this.top, this.size.x, this.size.y);
    }
}

class Piece extends Rect{
    constructor(_x, _y){
        super(80,80);
        this.pos.x = _x;
        this.pos.y = _y;
    }
    show(player){
        fill(player.color);
        strokeWeight(1);
        stroke(player.line_color);

        ellipse(this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
}

class Kouho extends Rect{
    constructor(_x, _y){
        super(20,20);
        this.pos.x = _x;
        this.pos.y = _y;
    }
    show(player){
        fill(player.Kcolor);
        strokeWeight(1);
        stroke(player.Kline_color);

        ellipse(this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
}

class Block{
    constructor(_x, _y, _xx, _yy, _fx, _fy, _size, _area){
        this.mass = new Mass(_x, _y);
        this.piece = new Piece(_x, _y);
        this.pos = new Vec(_x, _y);
        this.kouho = new Kouho(_x, _y);
        this.field = 0;
        this.can_put = true;
        this.can_see = true;

        this.Cmai = 1;

        this.Copy = [];

        this.field_move = new Vec(_fx, _fy);

        this.size = _size;
        this.Fpos = new Vec(_xx, _yy);

        this.mass_define = new Vec(0, 0);
        this.size_mass = new Vec(1, 1);
        this.pos_mass = new Vec(0, 0);

        this.area = _area;
        this.Nrev = [];
        this.Crev = [];
        for(var i = 0; i <= this.area ; i++){
            this.Nrev[i] = new Vec(0, 0);
            this.Crev[i] = i;
        }
        this.cst_size();
        this.size_culc(_size);
        this.pos_culcu(_xx, _yy);

    }
    set_Nrev(i, x, y){
        this.Nrev[i].x = x;
        this.Nrev[i].y = y;
    }

    set_Vrev(x, z){
        this.Crev[x] = z;
    }

    set_copy(x, y){
        this.Copy[this.Copy.length] = new Vec(x, y);
    }

    hole_set(mode){
        if(mode == 1){
            this.field = hole;
            this.mass.mass_color = "black";
            this.mass.touch_color = "black";
        }
        else if(mode == 2){
            this.field = hole;
            this.mass.mass_color = "#00000000";
            this.mass.touch_color = "#00000000";
            this.mass.line_color = "#00000000";
        }
        
    }
    pos_size_set(size_x ,size_y ,pos_x ,pos_y){
        this.size_mass.x = size_x;
        this.size_mass.y = size_y;
        this.pos_mass.x = pos_x;
        this.pos_mass.y = pos_y;

        this.size_culc();
        this.pos_culcu();
    }
    ex_pos_size_set(size_x ,size_y ,pos_x ,pos_y, size_field){
        this.size_mass.x = size_x;
        this.size_mass.y = size_y;
        this.pos_mass.x = pos_x;
        this.pos_mass.y = pos_y;

        this.size = size_field;

        this.cst_size();

        this.size_culc();
        this.pos_culcu();
    }
    ex_pos_set(x, y){
        this.field_move.x = x;
        this.field_move.y = y;

        // this.size_culc();
        this.pos_culcu();

    }
    size_define(x, y){
        if(x >= y){
            return x;
        }
        else{
            return y;
        }
    }
    cst_size(){
        this.mass_define.x = 500 / this.size;
        this.mass_define.y = 500 / this.size;
    }
    size_culc(){
        this.mass.size.x = (500 / this.size)*this.size_mass.x;
        this.mass.size.y = (500 / this.size)*this.size_mass.y;

        this.piece.size.x = (this.mass.size.x * 0.8);
        this.piece.size.y = (this.mass.size.y * 0.8);

        this.kouho.size.x = (this.mass.size.x * 0.3);
        this.kouho.size.y = (this.mass.size.y * 0.3);
    }
    pos_culcu(){
        // this.mass.pos.x = this.mass.pos.x * this.mass.size.x;
        // this.mass.pos.y = this.mass.pos.y * this.mass.size.y;

        this.mass.pos.x = (width/2 + this.mass_define.x * (this.pos.x) - (this.mass_define.x * this.Fpos.x)/2 - this.mass_define.x/2) + this.mass_define.x * (this.pos_mass.x + this.field_move.x);
        this.mass.pos.y = (height/2 + this.mass_define.y * (this.pos.y)- (this.mass_define.y * this.Fpos.y)/2 - this.mass_define.y/2) + this.mass_define.y * (this.pos_mass.y + this.field_move.y);

        this.piece.pos.x = this.mass.pos.x;
        this.piece.pos.y = this.mass.pos.y;

        this.kouho.pos.x = this.mass.pos.x;
        this.kouho.pos.y = this.mass.pos.y;
    }
    show(player,BWturn){
        this.mass.show();

        if(this.field == black || this.field == white){
            this.piece.show(player[this.field-1]);
        }
        else if(this.field == kouho){
            this.kouho.show(player[BWturn-1]);
            // this.piece.show(player[this.field-1]);
        }
    }
}

class Gimic{
    constructor(){
        //コマ
        this.piece = 0;
    }
}

class Field{
    constructor(_x, _y, _fx, _fy, _fieldsize, _area){
        this.Tcheck = false; 
        this.turn = 1;
        this.pass = 0;

        this.ex_com = false;

        this.BWturn = this.BW_check(this.turn, this.pass);

        this.field_move = new Vec(_fx, _fy);

        this.size = new Vec(_x, _y);

        this.gage = new Gage;

        this.gimic = new Gimic;

        if(_fieldsize == 0){
            this.field_size = this.size_define(this.size.x, this.size.y);
        }
        else{
            this.field_size = _fieldsize;
        }
        this.touch_field = new Vec(0, 0);
        this.area = _area;
        this.Rarea = [];
        for(var i = 0; i < this.area; i++){
            this.Rarea[i] = 0;
        }
        this.end = 0;
        this.block = [];
        for(var i = 0; i <= this.size.x+1; i++){
            this.block[i] = []
            for(var j = 0; j <= this.size.y+1; j++){
                this.block[i][j] = new Block(i, j, this.size.x, this.size.y, this.field_move.x, this.field_move.y, this.field_size, this.area);
                this.set_vec(_area, i,j)
            }    
        }

        this.player = [];
        this.player[0] = new Player("black", 20, 50);
        this.player[1] = new Player("white", 780, 50);
    }

    size_define(x, y){
        if(x >= y){
            return x;
        }
        else{
            return y;
        }
    }
    set_copy_S(x1, y1, x2, y2){
        this.block[x1][y1].set_copy(x2,y2);
        this.block[x2][y2].set_copy(x1,y1);
    }
    
        
    field_show(){
        this.Tcheck = false;

        this.player[0].Info_show(black, this.BWturn, this.end, this.player[1]);
        this.player[1].Info_show(white, this.BWturn, this.end, this.player[0]);

        this.gage.show(this.player);

        for(var i = 1; i <= this.size.x; i++){
            for(var j = 1; j <= this.size.y; j++){
                this.block[i][j].show(this.player, this.BWturn);
                if(this.block[i][j].mass.touch_rect()){
                    this.Tcheck = true;
                    this.touch_field.x = i;
                    this.touch_field.y = j;
                }
            }
        }

        if(this.ex_com){
            this.ex_com = false;
            this.COM_put(this.player[this.BWturn-1]);
        }
        else{
            if(this.player[this.BW_check(this.turn, this.pass)-1].com == 1){
                this.ex_com = true;
            }
        }
        
    }

    //クリックイベント
    click_mass(){
        if(this.Tcheck){
            if(this.block[this.touch_field.x][this.touch_field.y].field == kouho){
                this.Revv();
            }
        }

    }
    Revv(){
        this.Rev_s(this.touch_field.x, this.touch_field.y);

        if(this.block[this.touch_field.x][this.touch_field.y].Copy.length > 0){
            for(var i = 0; i < this.block[this.touch_field.x][this.touch_field.y].Copy.length; i++){
                this.Rev_s(this.block[this.touch_field.x][this.touch_field.y].Copy[i].x, this.block[this.touch_field.x][this.touch_field.y].Copy[i].y)
            }
        }

        this.Rev_x();

        this.turn++;
        this.BWturn = this.BW_check(this.turn, this.pass);

        this.kouho_check();
    }

    Rev_s(x, y){
        //ひっくり返せる枚数チェック
        for(var i = 0; i < this.area; i++){
            this.Rarea[i] = 0;
            this.Rarea[i] = this.reverse_check(x ,y ,i, this.BWturn, 0);
        }

        //ひっくり返す
        for(var i = 0; i < this.area; i++){
            this.reverse_R(x, y, i, this.Rarea[i]);
        }
        this.block[x][y].field = dummy_p;
    }
    Rev_x(){
        for(var i = 1; i <= this.size.x; i++){
            for(var j = 1; j <= this.size.y; j++){
                if(this.block[i][j].field == dummy ||
                    this.block[i][j].field == dummy_p){
                        this.block[i][j].field = this.BWturn;
                }
            }
        }
    }
    //コンピューターの石置き
    COM_put(player){
        var x,y;
        if(player.com != 0 && this.end != 2){
            // console.log("err"+player.com);
             while(1){
                x = ransu(0, this.size.x)+1;
                y = ransu(0, this.size.y)+1;
                // console.log(this.BWturn+"::"+x+","+y);
    
                if(this.block[x][y].field == kouho){
                    this.touch_field.x = x;
                    this.touch_field.y = y;
                    this.Revv();
                    break;
                }
            }
        }
    }

    //白黒判定
    BW_check(turn, pass){
        if((turn+pass) % 2 == 1){
            return black;
        }
        else if((turn+pass) % 2 == 0){
            return white;
        }
    }

    mai_count(player){
        var count = 0;
        for(var i = 1; i <= this.size.x; i++){
            for(var j = 1; j <= this.size.y; j++){
                if(this.block[i][j].field == player){
                    count += this.block[i][j].Cmai;
                }
            }
        }
        return count;
    }

    kouho_check(){
        var total = 0;
        var place = 0;
        this.end = 0;

        this.player[0].mai = this.mai_count(black);
        this.player[1].mai = this.mai_count(white);

        while(1){
            // console.log("end:"+this.end);
            place = 0;
            for(var i = 1; i <= this.size.x; i++){
                for(var j = 1; j <= this.size.y; j++){
                    total = 0;
                    if((this.block[i][j].field == none || this.block[i][j].field == kouho) 
                        && this.block[i][j].can_put){
                        // console.log("-----+"+i+","+j);
                        for(var k = 0; k < this.Rarea.length; k++){
                            this.Rarea[k] = 0;
                            this.Rarea[k] = this.reverse_check(i ,j ,k ,this.BWturn, 0);
                            total += this.Rarea[k];

                            // console.log("....."+k+":"+this.Rarea[k]);
                        }
                        
                        if(total != 0){
                            this.block[i][j].field = kouho;
                            place++;
                        }
                        else{
                            this.block[i][j].field = none
                        }
                    }
                    // console.log(i+","+j+":"+total);
                }
            }
            if(place != 0){
                break;
            }
            else{
                this.end++;
                this.pass++;
                this.BWturn = this.BW_check(this.turn, this.pass);
                if(this.end == 2){
                    break;
                }
            }
        }
        for(var i = 1; i <= this.size.x; i++){
            for(var j = 1; j <= this.size.y; j++){
                if(this.block[i][j].Copy.length != 0){
                    if(this.block[i][j].field == kouho){
                        for(var k = 0; k < this.block[i][j].Copy.length; k++){
                            this.block[this.block[i][j].Copy[k].x][this.block[i][j].Copy[k].y].field = kouho;
                        }
                    }
                }
            }
        }
    }

    //ひっくり返せるかチェック
    reverse_check(x ,y ,num, player, mai){
        // console.log("-----"+num); 

        var _num = num;

        if(this.block[x][y].Crev[num] != num){
            _num = this.block[x][y].Crev[num];
        }

        if(this.block[this.block[x][y].Nrev[_num].x][this.block[x][y].Nrev[_num].y].field == none ||
            this.block[this.block[x][y].Nrev[_num].x][this.block[x][y].Nrev[_num].y].field == hole ||
            this.block[this.block[x][y].Nrev[_num].x][this.block[x][y].Nrev[_num].y].field == kouho ||
            this.block[this.block[x][y].Nrev[_num].x][this.block[x][y].Nrev[_num].y].field == dummy_p){
                // console.log("a");
                return 0;
        }

        else if(this.block[this.block[x][y].Nrev[_num].x][this.block[x][y].Nrev[_num].y].field == player){
            // console.log("b");    
            return mai;
        }

        else{
            // console.log(this.block[x][y].Nrev[num].x + "," +this.block[x][y].Nrev[num].y);

            return this.reverse_check(this.block[x][y].Nrev[_num].x ,this.block[x][y].Nrev[_num].y ,_num, player, mai+1);
        }
    }

    reverse_R(x, y, num, mai){
        var xx=x, yy=y;
        var xxx, yyy;
        var _num = num;
        if(mai != 0){
            for(var i=0; i<mai; i++){
                if(this.block[xx][yy].Crev[_num] != _num){
                    _num = this.block[xx][yy].Crev[_num];
                }
                xxx = xx;
                yyy = yy;
                xx = this.block[xxx][yyy].Nrev[_num].x;
                yy = this.block[xxx][yyy].Nrev[_num].y;
                
                this.block[xx][yy].field = dummy;

                if(this.block[xx][yy].Copy.length != 0){
                    for(var k = 0; k < this.block[xx][yy].Copy.length; k++){
                        this.block[this.block[xx][yy].Copy[k].x][this.block[xx][yy].Copy[k].y].field = this.block[xx][yy].field;
                    }
                }
            }
        }
    }

    set_vec(area ,i ,j){
        if(area == 8){
            this.block[i][j].Nrev[0].x = i;
            this.block[i][j].Nrev[0].y = j-1;
    
            this.block[i][j].Nrev[1].x = i+1;
            this.block[i][j].Nrev[1].y = j-1;
    
            this.block[i][j].Nrev[2].x = i+1;
            this.block[i][j].Nrev[2].y = j;
    
            this.block[i][j].Nrev[3].x = i+1;
            this.block[i][j].Nrev[3].y = j+1;
    
            this.block[i][j].Nrev[4].x = i;
            this.block[i][j].Nrev[4].y = j+1;
    
            this.block[i][j].Nrev[5].x = i-1;
            this.block[i][j].Nrev[5].y = j+1;
    
            this.block[i][j].Nrev[6].x = i-1;
            this.block[i][j].Nrev[6].y = j;
    
            this.block[i][j].Nrev[7].x = i-1;
            this.block[i][j].Nrev[7].y = j-1;
        }
        else if(area == 6){
            if(j % 2 == 1){
                this.block[i][j].Nrev[0].x = i-1;
                this.block[i][j].Nrev[0].y = j-1;

                this.block[i][j].Nrev[1].x = i;
                this.block[i][j].Nrev[1].y = j-1;

                this.block[i][j].Nrev[2].x = i+1;
                this.block[i][j].Nrev[2].y = j;

                this.block[i][j].Nrev[3].x = i;
                this.block[i][j].Nrev[3].y = j+1;

                this.block[i][j].Nrev[4].x = i-1;
                this.block[i][j].Nrev[4].y = j+1;

                this.block[i][j].Nrev[5].x = i-1;
                this.block[i][j].Nrev[5].y = j;
            }
            if(j % 2 == 0){
                this.block[i][j].Nrev[0].x = i;
                this.block[i][j].Nrev[0].y = j-1;

                this.block[i][j].Nrev[1].x = i+1;
                this.block[i][j].Nrev[1].y = j-1;

                this.block[i][j].Nrev[2].x = i+1;
                this.block[i][j].Nrev[2].y = j;

                this.block[i][j].Nrev[3].x = i+1;
                this.block[i][j].Nrev[3].y = j+1;

                this.block[i][j].Nrev[4].x = i;
                this.block[i][j].Nrev[4].y = j+1;

                this.block[i][j].Nrev[5].x = i-1;
                this.block[i][j].Nrev[5].y = j;
            }
            
        }
        
    }
}
//-------------------------------------------------
//フィールド作成
class Field_nomal extends Field{
    constructor(_x, _y, _play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(_x ,_y ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        // this.player[0].com = 0;
        // this.player[1].com = 0;

        this.block[parseInt(_x/2)  ][parseInt(_y/2)+1].field = black;
        this.block[parseInt(_x/2)+1][parseInt(_y/2)  ].field = black;
        this.block[parseInt(_x/2)  ][parseInt(_y/2)  ].field = white;
        this.block[parseInt(_x/2)+1][parseInt(_y/2)+1].field = white;

        this.kouho_check();
    }
    show(){
        this.field_show();
    }
}
class Field_SP_01_00 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        for(var i=1; i<=2; i++){
            for(var j=1; j<=2; j++){
                if (!(i == 2 && j == 2)){
                    this.block[i][j].field = hole;
                    this.block[i][j].mass.mass_color = black;
                    this.block[i][j].mass.touch_color = black;

                    this.block[9-j][i].field = hole;
                    this.block[9-j][i].mass.mass_color = black;
                    this.block[9-j][i].mass.touch_color = black;

                    this.block[9-i][9-j].field = hole;
                    this.block[9-i][9-j].mass.mass_color = black;
                    this.block[9-i][9-j].mass.touch_color = black;

                    this.block[j][9-i].field = hole;
                    this.block[j][9-i].mass.mass_color = black;
                    this.block[j][9-i].mass.touch_color = black;
                }
                
            }
        }

        this.kouho_check();
    }
    show(){
        this.field_show();
    }
}

class Field_SP_01_01 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        for(var i=1; i<=8; i++){
            this.block[i][1].Nrev[0].y = 8;
            this.block[i][1].Nrev[1].y = 8;
            this.block[i][1].Nrev[7].y = 8;

            this.block[i][8].Nrev[3].y = 1;
            this.block[i][8].Nrev[4].y = 1;
            this.block[i][8].Nrev[5].y = 1;

            this.block[1][i].Nrev[5].x = 8;
            this.block[1][i].Nrev[6].x = 8;
            this.block[1][i].Nrev[7].x = 8;

            this.block[8][i].Nrev[1].x = 1;
            this.block[8][i].Nrev[2].x = 1;
            this.block[8][i].Nrev[3].x = 1;
        }
        

        this.kouho_check();
    }
    show(){
        this.field_show();
    }
}
class Field_SP_01_02 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,10, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        this.block[1][1].pos_size_set(2 ,2 ,-0.5 ,-0.5);
        this.block[1][8].pos_size_set(2 ,2 ,-0.5 ,0.5);
        this.block[8][1].pos_size_set(2 ,2 ,0.5 ,-0.5);
        this.block[8][8].pos_size_set(2 ,2 ,0.5 ,0.5);

        this.kouho_check();
    }
    show(){
        this.field_show();
    }
}

class Field_SP_01_03 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(9 ,9 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[1][9].field = black;
        this.block[9][1].field = black;
        this.block[1][1].field = white;
        this.block[9][9].field = white;

        for(var i=1; i<=9; i++){
            this.block[i][1].Nrev[0].y = 9;
            this.block[i][1].Nrev[1].y = 9;
            this.block[i][1].Nrev[7].y = 9;

            this.block[i][9].Nrev[3].y = 1;
            this.block[i][9].Nrev[4].y = 1;
            this.block[i][9].Nrev[5].y = 1;

            this.block[1][i].Nrev[5].x = 9;
            this.block[1][i].Nrev[6].x = 9;
            this.block[1][i].Nrev[7].x = 9;

            this.block[9][i].Nrev[1].x = 1;
            this.block[9][i].Nrev[2].x = 1;
            this.block[9][i].Nrev[3].x = 1;

            this.block[5][i].field = hole;
            this.block[5][i].mass.mass_color = "black";
            this.block[5][i].mass.touch_color = "black";
            this.block[5][i].pos_size_set(0.25 ,1 ,0 ,0);

            this.block[i][5].field = hole;
            this.block[i][5].mass.mass_color = "black";
            this.block[i][5].mass.touch_color = "black";
            this.block[i][5].pos_size_set(1 ,0.25 ,0 ,0);
        }
        

        this.kouho_check();
    }
    show(){
        this.field_show();
    }
}

class Field_SP_01_04 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;
        
        this.block[1][1].Crev[6] = 4;
        this.block[1][1].Crev[0] = 2;
        
        this.block[8][1].Crev[2] = 4;
        this.block[8][1].Crev[0] = 6;
        
        this.block[1][8].Crev[4] = 2;
        this.block[1][8].Crev[6] = 0;
        
        this.block[8][8].Crev[2] = 0;
        this.block[8][8].Crev[4] = 6;

        this.kouho_check();
    }
    show(){
        this.field_show();
    }
}
class Field_SP_01_05 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        for(var i=1; i<=2; i++){
            for(var j=1; j<=2; j++){
                if (!(i == 2 && j == 2)){
                    this.block[i][j].field = hole;
                    this.block[i][j].mass.mass_color = black;
                    this.block[i][j].mass.touch_color = black;

                    this.block[9-j][i].field = hole;
                    this.block[9-j][i].mass.mass_color = black;
                    this.block[9-j][i].mass.touch_color = black;

                    this.block[9-i][9-j].field = hole;
                    this.block[9-i][9-j].mass.mass_color = black;
                    this.block[9-i][9-j].mass.touch_color = black;

                    this.block[j][9-i].field = hole;
                    this.block[j][9-i].mass.mass_color = black;
                    this.block[j][9-i].mass.touch_color = black;
                }
                
            }
        }

        this.block[3][1].Crev[1] = 2;
        this.block[3][1].Crev[6] = 5;
        
        this.block[6][1].Crev[2] = 3;
        this.block[6][1].Crev[7] = 6;
        
        this.block[1][3].Crev[5] = 4;
        this.block[1][3].Crev[0] = 1;
        
        this.block[1][6].Crev[7] = 0;
        this.block[1][6].Crev[4] = 3;

        this.block[8][3].Crev[3] = 4;
        this.block[8][3].Crev[0] = 7;
        
        this.block[8][6].Crev[4] = 5;
        this.block[8][6].Crev[1] = 0;
        
        this.block[3][8].Crev[3] = 2;
        this.block[3][8].Crev[6] = 7;
        
        this.block[6][8].Crev[2] = 1;
        this.block[6][8].Crev[5] = 6;

        this.kouho_check();
    }
    show(){
        this.field_show();
    }
}
class Field_SP_01_06 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        for(var i=1; i<=8; i++){
            this.block[1][i].Nrev[6].x = 8;
            this.block[1][i].pos_size_set(1 ,0.9 ,0 ,-0.05);

            this.block[8][i].Nrev[2].x = 1;
            this.block[8][i].pos_size_set(1 ,0.9 ,0 ,0.05);

            this.block[1][i].Nrev[6].y = i - 1;

            this.block[8][i].Nrev[2].y = i + 1;
        }
        this.block[1][1].Nrev[6].y = 8;
        this.block[8][8].Nrev[2].y = 1;

        this.kouho_check();
    }
    show(){
        this.field_show();
    }
}
class Field_SP_01_07 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,16, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        this.gage.size.x = 250;
        this.gage.size.y = 20;

        this.gage.pos.y = canvas.height-160;

        this.player[0].pos.x += 150;
        this.player[1].pos.x -= 150;

        this.player[0].pos.y += 125;
        this.player[1].pos.y += 125;

        this.kouho_check();
    }
    show(){
        this.field_show();
    }
}
class Field_SP_01_08 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,6, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        this.player[0].pos.x -= 30;
        this.player[1].pos.x += 50;

        this.gage.size.x = 150;
        this.gage.size.y = 20;

        this.gage.pos.x = canvas.width-85;
        this.gage.pos.y = canvas.height-30;

        this.kouho_check();
    }
    show(){
        this.field_show();
    }
}
class Field_SP_01_09 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,8, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        for(var i=1; i<=8; i++){
            for(var j=1; j<=8; j++){
                this.block[i][j].Cmai = ransu(-5, 6);
                if(this.block[i][j].Cmai < 0){
                    this.block[i][j].mass.mass_color = "#1e90ff";
                }
                else if(this.block[i][j].Cmai > 0){
                    this.block[i][j].mass.mass_color = "#fa8072";
                }
            }
        }

        this.kouho_check();
    }
    show(){
        this.field_show();
    }
}
class Field_SP_01_10 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        for(var i=1; i<= 4; i++){
            var xx = 0, yy = 0;
            if(i == 1){
                xx = 1;
                yy = 1;
            }
            else if(i == 2){
                xx = 7;
                yy = 1;
            }
            else if(i == 3){
                xx = 1;
                yy = 7;
            }
            else if(i == 4){
                xx = 7;
                yy = 7;
            }

            this.block[xx][yy].set_copy(xx,yy+1);
            this.block[xx][yy].set_copy(xx+1,yy);
            this.block[xx][yy].set_copy(xx+1,yy+1);

            this.block[xx][yy+1].set_copy(xx,yy);
            this.block[xx][yy+1].set_copy(xx+1,yy);
            this.block[xx][yy+1].set_copy(xx+1,yy+1);

            this.block[xx+1][yy].set_copy(xx,yy);
            this.block[xx+1][yy].set_copy(xx,yy+1);
            this.block[xx+1][yy].set_copy(xx+1,yy+1);

            this.block[xx+1][yy+1].set_copy(xx,yy);
            this.block[xx+1][yy+1].set_copy(xx,yy+1);
            this.block[xx+1][yy+1].set_copy(xx+1,yy);

            this.block[xx][yy].pos_size_set(2 ,2 ,0.5 ,0.5);
            this.block[xx+1][yy].pos_size_set(2 ,2 ,-0.5 ,0.5);
            this.block[xx][yy+1].pos_size_set(2 ,2 ,0.5 ,-0.5);
            this.block[xx+1][yy+1].pos_size_set(2 ,2 ,-0.5 ,-0.5);

            this.block[xx][yy+1].Cmai = 0;
            this.block[xx+1][yy].Cmai = 0;
            this.block[xx+1][yy+1].Cmai = 0;

        }
        this.kouho_check();
    }
    show(){
        this.field_show();
    }
}
class Field_SP_01_11 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        for(var i=1; i<= 4; i++){
            var xx = 0, yy = 0;
            if(i == 1){
                xx = 2;
                yy = 2;
            }
            else if(i == 2){
                xx = 6;
                yy = 2;
            }
            else if(i == 3){
                xx = 2;
                yy = 6;
            }
            else if(i == 4){
                xx = 6;
                yy = 6;
            }

            this.block[xx][yy].set_copy(xx,yy+1);
            this.block[xx][yy].set_copy(xx+1,yy);
            this.block[xx][yy].set_copy(xx+1,yy+1);

            this.block[xx][yy+1].set_copy(xx,yy);
            this.block[xx][yy+1].set_copy(xx+1,yy);
            this.block[xx][yy+1].set_copy(xx+1,yy+1);

            this.block[xx+1][yy].set_copy(xx,yy);
            this.block[xx+1][yy].set_copy(xx,yy+1);
            this.block[xx+1][yy].set_copy(xx+1,yy+1);

            this.block[xx+1][yy+1].set_copy(xx,yy);
            this.block[xx+1][yy+1].set_copy(xx,yy+1);
            this.block[xx+1][yy+1].set_copy(xx+1,yy);

            this.block[xx][yy].pos_size_set(2 ,2 ,0.5 ,0.5);
            this.block[xx+1][yy].pos_size_set(2 ,2 ,-0.5 ,0.5);
            this.block[xx][yy+1].pos_size_set(2 ,2 ,0.5 ,-0.5);
            this.block[xx+1][yy+1].pos_size_set(2 ,2 ,-0.5 ,-0.5);

            this.block[xx][yy+1].Cmai = 0;
            this.block[xx+1][yy].Cmai = 0;
            this.block[xx+1][yy+1].Cmai = 0;

        }
        this.kouho_check();
    }
    show(){
        this.field_show();
    }
}
class Field_SP_01_12 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(15 ,8 ,0 ,1.8 ,12, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[7][5].field = white;
        this.block[8][5].field = white;
        this.block[8][4].field = black;
        this.block[9][4].field = black;

        for(var i=1; i<=7; i++){
            for(var j=1; j<=i; j++){
                this.block[j][8-i].field = hole;
                this.block[j][8-i].mass.mass_color = black;
                this.block[j][8-i].mass.touch_color = black;

                this.block[16-j][i+1].field = hole;
                this.block[16-j][i+1].mass.mass_color = black;
                this.block[16-j][i+1].mass.touch_color = black;
            }
        }

        this.kouho_check();
    }
    show(){
        this.field_show();
    }
}
class Field_SP_01_13 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(9 ,9 ,0 ,0 ,0, 6);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        // this.block[4][4].field = white;
        this.block[5][5].field = black;
        this.block[4][5].field = white;
        this.block[5][4].field = white;
        this.block[5][6].field = white;
        // this.block[5][4].field = black;

        for(var i=2; i<=9; i = i+2){
            for(var j=1; j<=this.size.x; j++){
                this.block[j][i].pos_size_set(1 ,1 ,0.5 ,0);
            }
        }
        
        this.block[1][1].hole_set(2);
        this.block[2][1].hole_set(2);
        this.block[1][2].hole_set(2);
        this.block[1][3].hole_set(2);
        this.block[1][7].hole_set(2);
        this.block[1][8].hole_set(2);
        this.block[1][9].hole_set(2);
        this.block[2][9].hole_set(2);

        this.block[8][1].hole_set(2);
        this.block[9][1].hole_set(2);
        this.block[9][2].hole_set(2);
        this.block[8][2].hole_set(2);
        this.block[9][3].hole_set(2);
        this.block[9][4].hole_set(2);
        this.block[9][6].hole_set(2);
        this.block[9][7].hole_set(2);
        this.block[8][8].hole_set(2);
        this.block[9][8].hole_set(2);
        this.block[8][9].hole_set(2);
        this.block[9][9].hole_set(2);

        this.kouho_check();
    }
    show(){
        this.field_show();
    }
}
class Field_SP_01_14 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(12 ,8 ,-1 ,0 ,10, 6);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[6][5].field = black;
        this.block[7][4].field = black;
        this.block[6][4].field = white;
        this.block[7][5].field = white;

        for(var i=2; i<=9; i = i+2){
            for(var j=1; j<=this.size.x; j++){
                this.block[j][i].pos_size_set(1 ,1 ,0.5 ,0);
            }
        }

        for(var i=1; i<=4; i ++){
            for(var j=0; j<i; j++){
                this.block[5-i][j*2+1].hole_set(2);
                this.block[5-i][j*2].hole_set(2);

                this.block[i+8][8-(j*2-1)].hole_set(2);
                this.block[i+8][8-(j*2)].hole_set(2);
            }
        }

        this.kouho_check();
    }
    show(){
        this.field_show();
    }
}
class Field_SP_01_15 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(16 ,16 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[9][7].field = black;
        this.block[10][7].field = black;
        this.block[9][8].field = black;
        this.block[10][8].field = black;

        this.block[7][9].field = black;
        this.block[8][9].field = black;
        this.block[7][10].field = black;
        this.block[8][10].field = black;

        this.block[8][7].field = white;
        this.block[7][7].field = white;
        this.block[8][8].field = white;
        this.block[7][8].field = white;

        this.block[9][9].field = white;
        this.block[10][9].field = white;
        this.block[9][10].field = white;
        this.block[10][10].field = white;

        for(var i=1; i<=16; i = i+2){
            for(var j=1; j<16; j = j+2){
                this.block[i][j].set_copy(i,j+1);
                this.block[i][j].set_copy(i+1,j);
                this.block[i][j].set_copy(i+1,j+1);

                this.block[i][j+1].set_copy(i,j);
                this.block[i][j+1].set_copy(i+1,j);
                this.block[i][j+1].set_copy(i+1,j+1);

                this.block[i+1][j].set_copy(i,j);
                this.block[i+1][j].set_copy(i,j+1);
                this.block[i+1][j].set_copy(i+1,j+1);

                this.block[i+1][j+1].set_copy(i,j);
                this.block[i+1][j+1].set_copy(i,j+1);
                this.block[i+1][j+1].set_copy(i+1,j);

                this.block[i+1][j].Cmai = 0;
                this.block[i][j+1].Cmai = 0;
                this.block[i+1][j+1].Cmai = 0;
            }
        }

        this.kouho_check();
    }
    show(){
        this.field_show();
    }
}
class Field_SP_01_16 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(9 ,9 ,0 ,0 ,0, 6);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[4][6].field = black;
        this.block[5][6].field = black;
        this.block[5][7].field = black;

        this.block[5][5].field = white;
        this.block[4][7].field = white;
        this.block[6][7].field = white;
        // this.block[6][4].field = white;
        // this.block[7][5].field = white;

        for(var i=2; i<=11; i = i+2){
            for(var j=1; j<=this.size.x; j++){
                this.block[j][i].pos_size_set(1 ,1 ,0.5 ,0);
            }
        }

        for(var i=1; i<=4; i ++){
            for(var j=0; j<i; j++){
                this.block[5-i][j*2+1].hole_set(2);
                this.block[5-i][j*2].hole_set(2);
            }
        }

        this.block[6][1].hole_set(2);
        this.block[7][1].hole_set(2);
        this.block[8][1].hole_set(2);
        this.block[6][2].hole_set(2);
        this.block[7][2].hole_set(2);
        this.block[8][2].hole_set(2);
        this.block[7][3].hole_set(2);
        this.block[8][3].hole_set(2);
        this.block[7][4].hole_set(2);
        this.block[8][4].hole_set(2);
        this.block[8][5].hole_set(2);
        this.block[8][6].hole_set(2);

        for(var i=1; i<=8; i ++){
            this.block[9][i].hole_set(2);
        }

        this.kouho_check();
    }
    show(){
        this.field_show();
    }
}
class Field_SP_01_17 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(16 ,16 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[9][7].field = black;
        this.block[10][7].field = black;
        this.block[9][8].field = black;
        this.block[10][8].field = black;

        this.block[7][9].field = black;
        this.block[8][9].field = black;
        this.block[7][10].field = black;
        this.block[8][10].field = black;

        this.block[8][7].field = white;
        this.block[7][7].field = white;
        this.block[8][8].field = white;
        this.block[7][8].field = white;

        this.block[9][9].field = white;
        this.block[10][9].field = white;
        this.block[9][10].field = white;
        this.block[10][10].field = white;

        for(var i=1; i<=16; i = i+2){
            for(var j=1; j<16; j = j+2){
                this.block[i][j].set_copy(i,j+1);
                this.block[i][j].set_copy(i+1,j);
                this.block[i][j].set_copy(i+1,j+1);

                this.block[i][j+1].set_copy(i,j);
                this.block[i][j+1].set_copy(i+1,j);
                this.block[i][j+1].set_copy(i+1,j+1);

                this.block[i+1][j].set_copy(i,j);
                this.block[i+1][j].set_copy(i,j+1);
                this.block[i+1][j].set_copy(i+1,j+1);

                this.block[i+1][j+1].set_copy(i,j);
                this.block[i+1][j+1].set_copy(i,j+1);
                this.block[i+1][j+1].set_copy(i+1,j);

                this.block[i+1][j].Cmai = 0;
                this.block[i][j+1].Cmai = 0;
                this.block[i+1][j+1].Cmai = 0;

                this.block[i][j].Nrev[1].x = 0;
                this.block[i][j].Nrev[1].y = 0;
                this.block[i][j].Nrev[5].x = 0;
                this.block[i][j].Nrev[5].y = 0;

                this.block[i+1][j].Nrev[7].x = 0;
                this.block[i+1][j].Nrev[7].y = 0;
                this.block[i+1][j].Nrev[3].x = 0;
                this.block[i+1][j].Nrev[3].y = 0;

                this.block[i][j+1].Nrev[7].x = 0;
                this.block[i][j+1].Nrev[7].y = 0;
                this.block[i][j+1].Nrev[3].x = 0;
                this.block[i][j+1].Nrev[3].y = 0;

                this.block[i+1][j+1].Nrev[0].x = 0;
                this.block[i+1][j+1].Nrev[0].y = 0;
                this.block[i+1][j+1].Nrev[5].x = 0;
                this.block[i+1][j+1].Nrev[5].y = 0;
            }
        }

        this.kouho_check();
    }
    show(){
        this.field_show();
    }
}
class Field_SP_01_18 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(9 ,8 ,-0.5 ,0 ,8, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.player[0].line_color = "#00000000";
        this.player[1].line_color = "#00000000";

        this.player[0].info_color = "#C8C8C8";
        this.player[1].info_color = "#C8C8C8";

        this.player[0].Kline_color = "#00000000";
        this.player[1].Kline_color = "#00000000";

        this.block[5][5].field = black;
        this.block[6][4].field = black;
        this.block[5][4].field = white;
        this.block[6][5].field = white;

        for(var i=2; i<=8; i++){
            this.block[1][i].hole_set(2);
        }
        this.block[1][1].field = hole;
        this.block[1][1].mass.mass_color = "black";
        this.block[1][1].mass.touch_color = "black";
        this.block[1][1].pos_size_set(8.2, 8.2, 4.5, 3.5);

        for(var i=2; i<=9; i++){
            for(var j=1; j<=8; j++){
                this.block[i][j].pos_size_set(1, 1, 0, 0);
            }
        }

        this.kouho_check();
    }
    show(){
        this.field_show();
    }
}

class Field_SP_01_19 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.player[0].line_color = "#000000";
        this.player[1].line_color = "#FFFFFF";

        this.player[0].color = "#00000000";
        this.player[1].color = "#FFFFFF00";

        this.player[0].Kcolor = "#000000";
        this.player[1].Kcolor = "#FFFFFF";

        this.player[0].info_color = "#C8C8C8";
        this.player[1].info_color = "#C8C8C8";

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        this.kouho_check();
    }
    show(){
        this.field_show();
    }
}
class Field_SP_02_00 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(17 ,8 ,0 ,2 ,12, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        this.block[4+9][5].field = black;
        this.block[5+9][4].field = black;
        this.block[4+9][4].field = white;
        this.block[5+9][5].field = white;

        for(var i=1; i<=8; i ++){
            this.block[9][i].hole_set(1);
        }

        this.kouho_check();
    }
    show(){
        this.field_show();
    }
}
class Field_SP_02_01 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        for(var i=1; i<=4; i ++){
            for(var j=1; j<=8; j++){
                this.block[5-i][j].pos_size_set(0.5, 1, 0.25+(0.5*(i-1)), 0);
                this.block[4+i][j].pos_size_set(0.5, 1, -0.25+(-0.5*(i-1)), 0);
            }
        }

        this.gage.size.x = 250;
        // this.gage.size.y = 20;

        // this.gage.pos.y = canvas.height-160;

        // this.player[0].pos.x += 120;
         this.player[1].pos.x -= 120;

        this.player[0].pos.x = this.player[1].pos.x

        // this.player[0].pos.y += 125;
        this.player[1].pos.y += 160;

        this.kouho_check();
    }
    show(){
        this.field_show();
    }
}
class Field_SP_02_02 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        this.block[8][1].set_Vrev(0,6);
        this.block[8][2].set_Vrev(0,6);
        this.block[7][3].set_Vrev(0,6);
        this.block[6][4].set_Vrev(0,6);

        this.block[8][1].set_Vrev(2,4);
        this.block[8][2].set_Vrev(2,4);
        this.block[7][3].set_Vrev(2,4);
        this.block[6][4].set_Vrev(2,4);

        for(var i=0; i<4; i++){
            this.block[1+i][1+i].set_Vrev(6,4);
            this.block[1+i][1+i].set_Vrev(0,2);

            this.block[8-i][8-i].set_Vrev(2,0);
            this.block[8-i][8-i].set_Vrev(4,6);

            this.block[1+i][8-i].set_Vrev(4,2);
            this.block[1+i][8-i].set_Vrev(6,0);
        }

        this.block[8][1].set_Nrev(4, 5, 5);
        this.block[5][5].set_Nrev(0, 8, 1);

        this.kouho_check();
    }
    show(){
        this.field_show();
    }
}
class Field_SP_02_03 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        for(var i=1; i<=8; i++){
            for(var j=1; j<=8; j++){
                if(i != j){
                    this.set_copy_S(i, 1, j, 1);
                    this.set_copy_S(i, 8, j, 8);
                }
            }
        }

        this.block[1][1].pos_size_set(8 ,1 ,3.5 ,0);
        this.block[2][1].pos_size_set(8 ,1 ,2.5 ,0);
        this.block[3][1].pos_size_set(8 ,1 ,1.5 ,0);
        this.block[4][1].pos_size_set(8 ,1 ,0.5 ,0);
        this.block[5][1].pos_size_set(8 ,1 ,-0.5 ,0);
        this.block[6][1].pos_size_set(8 ,1 ,-1.5 ,0);
        this.block[7][1].pos_size_set(8 ,1 ,-2.5 ,0);
        this.block[8][1].pos_size_set(8 ,1 ,-3.5 ,0);

        this.block[1][8].pos_size_set(8 ,1 ,3.5 ,0);
        this.block[2][8].pos_size_set(8 ,1 ,2.5 ,0);
        this.block[3][8].pos_size_set(8 ,1 ,1.5 ,0);
        this.block[4][8].pos_size_set(8 ,1 ,0.5 ,0);
        this.block[5][8].pos_size_set(8 ,1 ,-0.5 ,0);
        this.block[6][8].pos_size_set(8 ,1 ,-1.5 ,0);
        this.block[7][8].pos_size_set(8 ,1 ,-2.5 ,0);
        this.block[8][8].pos_size_set(8 ,1 ,-3.5 ,0);

        // for(var i=1; i<=8; i++){
        //     for(var j=2; j<=7; j++){
        //         this.block[i][j].field = white;
        //     }
        // }
        // for(var i=1; i<=8; i++){
        //     this.block[i][8].field = black;
        // }

        this.kouho_check();
    }
    show(){
        this.field_show();
    }
}
class Field_SP_02_04 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        this.kouho_check();
    }
    show(){
        this.field_show();

        this.draw_field()
    }
    draw_field(){
        strokeWeight(2);
        stroke("#0000FFaa");
        for(var i=1; i<=8; i++){
                line(this.block[1][i].mass.pos.x, this.block[1][i].mass.pos.y, this.block[8][i].mass.pos.x, this.block[8][i].mass.pos.y);
                line(this.block[i][1].mass.pos.x, this.block[i][1].mass.pos.y, this.block[i][8].mass.pos.x, this.block[i][8].mass.pos.y);
                if(i>1){
                    line(this.block[i][1].mass.pos.x, this.block[i][1].mass.pos.y, this.block[1][i].mass.pos.x, this.block[1][i].mass.pos.y);
                    line(this.block[8][i].mass.pos.x, this.block[8][i].mass.pos.y, this.block[i][8].mass.pos.x, this.block[i][8].mass.pos.y);

                    
                    line(this.block[9-i][1].mass.pos.x, this.block[9-i][1].mass.pos.y, this.block[8][i].mass.pos.x, this.block[8][i].mass.pos.y);
                    line(this.block[1][i].mass.pos.x, this.block[1][i].mass.pos.y, this.block[9-i][8].mass.pos.x, this.block[9-i][8].mass.pos.y);
                }
        }
    }
}
class Field_SP_02_05 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        for(var i=1; i<=8; i++){
            for(var j=1; j<=8; j++){
                this.block[i][j].mass.mass_color = "#00000000"
                this.block[i][j].mass.touch_color = "#00000000"
                this.block[i][j].mass.line_color = "#00000000"
            }
        }

        this.kouho_check();
    }
    show(){
        this.field_show();

        this.draw_field()
    }
    draw_field(){
        stroke(0);
        fill("#00000000");
        rect(this.block[1][1].mass.left, this.block[1][1].mass.top, 500, 500);
    }
}
class Field_SP_02_06 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.player[0].line_color = "white"

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        for(var i=1; i<=8; i++){
            for(var j=1; j<=8; j++){
                this.block[i][j].mass.mass_color = "#00000000"
                this.block[i][j].mass.touch_color = "#00000000"
                this.block[i][j].mass.line_color = "#AAAAAA"
            }
        }

        this.gage.size.x = 500;
        this.gage.size.y = 500;

        this.gage.pos.x = canvas.width/2;
        this.gage.pos.y = canvas.height/2;

        this.kouho_check();
    }
    show(){
        this.field_show();
    }
}
class Field_SP_02_07 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        this.sikaku = [];
        this.sikaku_speed = [];
        this.pp = 0;
        this.plus = new Vec(1,1)
        for(var i = 0; i < 20; i++){
            this.sikaku[i] = new Rect(100, 100);
            this.sikaku[i].pos.x = ransu(this.sikaku[i].pos.x,canvas.width-this.sikaku[i].pos.x)
            this.sikaku[i].pos.y = ransu(this.sikaku[i].pos.y,canvas.height-this.sikaku[i].pos.y)
            this.pp = ransu(0,4);
            if(this.pp == 0){
                this.plus.x = 1;
                this.plus.x = 1;
            }
            else if(this.pp == 1){
                this.plus.x = 1;
                this.plus.x = -1;
            }
            else if(this.pp == 2){
                this.plus.x = -1;
                this.plus.x = 1;
            }
            else if(this.pp == 3){
                this.plus.x = -1;
                this.plus.x = -1;
            }

            this.sikaku_speed[i] = new Vec(5*this.plus.x, 5*this.plus.y)
        }

        this.kouho_check();
    }
    show(){
        this.field_show();

        this.draw_field()
    }
    draw_field(){
        fill("blue");
        for(var i = 0; i < this.sikaku.length; i++){
            rect(this.sikaku[i].left, this.sikaku[i].top, this.sikaku[i].size.x ,this.sikaku[i].size.y);

            this.sikaku[i].pos.x += this.sikaku_speed[i].x
            this.sikaku[i].pos.y += this.sikaku_speed[i].y

            if(this.end != 2){
                if(this.sikaku[i].left <= 0){
                    this.sikaku_speed[i].x = ransu(1,7);
                }
                else if(this.sikaku[i].right >= canvas.width){
                    this.sikaku_speed[i].x = -ransu(1,7);
                }

                if(this.sikaku[i].top <= 0){
                    this.sikaku_speed[i].y = ransu(1,7);
                }
                else if(this.sikaku[i].bottom >= canvas.height){
                    this.sikaku_speed[i].y = -ransu(1,7);
                }
            }
            
        }
    }
}
class Field_SP_02_08 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.player[0].color = "#fff9f9";
        this.player[1].color = "#f9f9ff";

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        for(var i=1; i<=8; i++){
            for(var j=1; j<=8; j++){
                this.block[i][j].mass.mass_color = "#FFFFFF";
                this.block[i][j].mass.touch_color = "#F0F0F0";
                this.block[i][j].mass.line_color = "#AAAAAA";
            }
        }

        this.kouho_check();
    }
    show(){
        this.field_show();

        this.draw_field()
    }
    draw_field(){
    }
}
class Field_SP_02_09 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        this.time = {count:0, start:2, move:3, wait:2, finish:8};
        this.timer_mode = 0;
        this.time_speed = 0;
        this.move_plmi = true;
        this.time_check = true;
        this.timer_set();
        this.Xsize = [];
        this.Xsize[0] = 30;
        this.Xsize[1] = 6;

        this.Xsize[2] = 8;

        this.Xnum = 0;

        this.kouho_check();
    }
    show(){
        this.field_show();

        this.draw_field()

        // console.log(this.time.count ,this.field_size);
    }
    draw_field(){
        if(this.timer_mode == 0){
            this.time.count++;

            if(this.time.count >= this.time.start){
                this.timer_mode = 1;
                this.time_speed = (this.Xsize[this.Xnum] - this.field_size) / this.time.move;
                this.time.count = 0;
            }
        }
        else if(this.timer_mode == 1){
            this.time.count++;

            this.field_size += this.time_speed;
            for(var i=1; i<=8; i++){
                for(var j=1; j<=8; j++){
                    this.block[i][j].ex_pos_size_set(1,1,0,0,this.field_size);
                }
            }

            if(this.time.count >= this.time.move){
                this.timer_mode = 2;
                this.time.count = 0;
                if(this.end == 2 && !this.time_check){
                    this.timer_mode = 3;
                    this.time.count = 0;
                }
            }
        }
        else if(this.timer_mode == 2){
            this.time.count++;

            if(this.time.count >= this.time.wait){
                this.timer_mode = 1;
                this.time.count = 0;
                this.Xnum++;
                if(this.Xsize.length-1 <= this.Xnum){
                    this.Xnum = 0;
                }
                if(this.end == 2){
                    this.Xnum = 2;
                    this.time_check = false;
                }
                this.time_speed = (this.Xsize[this.Xnum] - this.field_size) / this.time.move;
            }
        }

    }
    timer_set(){
        this.time.start *= 60;
        this.time.move  *= 60;
        this.time.wait  *= 60;
    }
}
class Field_SP_02_10 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        for(var i=1; i<=2; i++){
            for(var j=1; j<=2; j++){
                if (!(i == 2 && j == 2)){
                    this.block[i][j].hole_set(2);

                    this.block[9-j][i].hole_set(2);

                    this.block[9-i][9-j].hole_set(2);

                    this.block[j][9-i].hole_set(2);
                }
                
            }
        }

        this.block[3][1].Crev[1] = 2;
        this.block[3][1].Crev[6] = 5;
        
        this.block[6][1].Crev[2] = 3;
        this.block[6][1].Crev[7] = 6;
        
        this.block[1][3].Crev[5] = 4;
        this.block[1][3].Crev[0] = 1;
        
        this.block[1][6].Crev[7] = 0;
        this.block[1][6].Crev[4] = 3;

        this.block[8][3].Crev[3] = 4;
        this.block[8][3].Crev[0] = 7;
        
        this.block[8][6].Crev[4] = 5;
        this.block[8][6].Crev[1] = 0;
        
        this.block[3][8].Crev[3] = 2;
        this.block[3][8].Crev[6] = 7;
        
        this.block[6][8].Crev[2] = 1;
        this.block[6][8].Crev[5] = 6;

        this.kouho_check();
    }
    show(){
        this.field_show();
        this.draw_field();
    }
    draw_field(){
        stroke(0);
        strokeWeight(2);
        noFill();
        ellipse(canvas.width/2, canvas.height/2,500-this.block[1][1].mass.size.x, 500-this.block[1][1].mass.size.y);
    }
}
class Field_SP_02_11 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        this.kouho_check();
    }
    show(){
        this.field_show();
        this.draw_field();
    }
    draw_field(){
        stroke("blue");
        strokeWeight(10);
        line(this.block[1][1].mass.left ,this.block[1][1].mass.top ,mouseX ,mouseY);
        line(this.block[8][1].mass.right ,this.block[8][1].mass.top ,mouseX ,mouseY);
        line(this.block[1][8].mass.left ,this.block[1][8].mass.bottom ,mouseX ,mouseY);
        line(this.block[8][8].mass.right ,this.block[8][8].mass.bottom ,mouseX ,mouseY);
    }
}
class Field_SP_02_12 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        this.kouho_check();
    }
    show(){
        this.field_show();
        this.draw_field();
    }
    draw_field(){
        stroke("blue");
        strokeWeight(5);
        for(var i=1; i<=8; i++){
            for(var j=1; j<=8; j++){
                line(this.block[i][j].mass.pos.x ,this.block[i][j].mass.pos.y ,mouseX ,mouseY);
            }
        }
    }
}
class Field_SP_02_13 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,17 ,0 ,4.5 ,8, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        this.block[4][5+9].field = black;
        this.block[5][4+9].field = black;
        this.block[4][4+9].field = white;
        this.block[5][5+9].field = white;

        for(var i=1; i<=8; i ++){
            this.block[i][9].hole_set(2);
        }

        for(var i=1; i<=8; i++){
            for(var j=1; j<=8; j++){
                this.block[i][j+9].can_put = false;
                this.block[i][j+9].Cmai = 0;
            }
        }

        this.battle = 0;
        this.move_mode = 0;

        this.exField = 0;

        this.timer = 0;
        this.time = {move: 4*60, move_2: 2*60};
        this.Tpos = [];
        this.Tpos[0] = 9;
        this.Tpos[1] = -9-4.5;
        this.speed = 0;
        this.size_speed = 0;

        this.kouho_check();
    }
    show(){
        this.field_show();

        this.draw_field();
        this.move_field()
    }
    draw_field(){
        if(this.end == 2){
            if(this.battle == 0){
                this.battle = 1;
                // for(var i=1; i<=8; i++){
                //     for(var j=1; j<=8; j++){
                //         this.block[i][j+9].can_put = true;
                //     }
                // }

                this.timer = 0;
                this.speed = (this.exField - this.Tpos[0]) / this.time.move;
            }

            else if(this.battle == 2){
                this.battle = 3;
                
                this.speed = (this.exField - this.Tpos[1]) / this.time.move_2;
                this.size_speed = (17 - this.field_size) / this.time.move_2;
            }
        }
    }
    move_field(){
        if(this.battle ==  1){
            this.timer++;
            this.exField += this.speed;

            for(var i=1; i<=8; i++){
                for(var j=1; j<=17; j++){
                    // this.block[i][j].Fpos.y = this.field_move.y
                    this.block[i][j].pos_size_set(1,1,0,this.exField);
                }
            }
            if(this.timer >= this.time.move){
                this.timer = 0;
                this.battle = 2;

                for(var i=1; i<=8; i++){
                    for(var j=1; j<=8; j++){
                        this.block[i][j+9].can_put = true;
                        this.block[i][j+9].Cmai = 1;
                        this.block[i][j].Cmai = 0;
                    }
                }

                // this.block[4][5+9].field = black;
                // this.block[5][4+9].field = black;
                // this.block[4][4+9].field = white;
                // this.block[5][5+9].field = white;
                this.kouho_check();
            }

            
        }

        else if(this.battle ==  3){
            this.timer++;
            this.exField += this.speed;
            this.field_size += this.size_speed

            for(var i=1; i<=8; i++){
                for(var j=1; j<=17; j++){
                    // this.block[i][j].Fpos.y = this.field_move.y
                    // this.block[i][j].pos_size_set(1,1,0,this.field_move.y);
                    this.block[i][j].ex_pos_size_set(1,1,0,this.exField,this.field_size);

                }
            }
            if(this.timer >= this.time.move_2){
                this.timer = 0;
                this.battle = 4;

                for(var i=1; i<=8; i++){
                    for(var j=1; j<=8; j++){
                        this.block[i][j].Cmai = 1;
                    }
                }
                this.kouho_check();
            }
        }
    }
}
class Field_SP_02_14 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(12 ,12 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[6][7].field = black;
        this.block[7][6].field = black;
        this.block[6][6].field = white;
        this.block[7][7].field = white;

        this.kouho_check();
    }
    show(){
        this.field_show();
        this.draw_field();
    }
    draw_field(){

    }
}
class Field_SP_02_15 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(4 ,4 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[2][3].field = black;
        this.block[3][2].field = black;
        this.block[2][2].field = white;
        this.block[3][3].field = white;

        this.kouho_check();
    }
    show(){
        this.field_show();
        this.draw_field();
    }
    draw_field(){

    }
}
class Field_SP_02_16 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,50, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        this.kouho_check();
    }
    show(){
        this.field_show();
        this.draw_field();
    }
    draw_field(){

    }
}
class Field_SP_02_17 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(30 ,30 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[15][16].field = black;
        this.block[16][15].field = black;
        this.block[15][15].field = white;
        this.block[16][16].field = white;

        this.kouho_check();
    }
    show(){
        this.field_show();
        this.draw_field();
    }
    draw_field(){

    }
}
class Field_SP_02_18 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        this.kouho_check();

        this.blind_block = []

        for(var i = 0; i <= this.size.x+1; i++){
            this.blind_block[i] = []
            for(var j = 0; j <= this.size.y+1; j++){
                this.blind_block[i][j] = new Block(i, j, this.size.x, this.size.y, this.field_move.x, this.field_move.y, this.field_size, this.area);
                // this.blind_block[i][j].mass.mass_color = "white";
                // this.blind_block[i][j].mass.touch_color = "pink";
            }    
        }

        this.move = {mode: 0, move: -10, time: 4*60};
        this.speed = 0;
        this.y_move = 0;
        this.time = 0;
    }
    speed_set(){
        this.speed = (this.move.move - this.field_move.y) / this.move.time;
    }

    show(){
        this.field_show();
        this.draw_field();
        this.draw_move();
    }
    draw_field(){
        for(var i = 1; i <= this.size.x; i++){
            for(var j = 1; j <= this.size.y; j++){
                if(this.block[i][j].field == kouho){
                    this.blind_block[i][j].field = kouho;
                }
                else{
                    this.blind_block[i][j].field = none;
                }

                this.blind_block[i][j].show(this.player, this.BWturn);
            }
        }
    }
    draw_move(){
        if(this.move.mode == 0){
            if(this.end == 2){
                console.log("xxx");
                this.move.mode = 1;
                this.speed_set();
            }
        }
        else if(this.move.mode == 1 ){
            this.time++;
            this.y_move += this.speed;
            for(var i = 1; i <= this.size.x; i++){
                for(var j = 1; j <= this.size.y; j++){
                    this.blind_block[i][j].ex_pos_set(0, this.y_move);
                }
            }
            if(this.time >= this.move.time){
                this.move.mode = 2;
            }
        }
    }
}
class Field_SP_02_19 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        for(var i = 1; i <= this.size.x; i++){
            for(var j = 1; j <= this.size.y; j++){
                this.block[i][j].Cmai = -1;
            }
        }

         this.gage.size.x = 500/3;

        this.kouho_check();
    }
    show(){
        this.field_show();
        this.draw_field();
    }
    draw_field(){

    }
}
class Field_SP_03_00 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(100 ,100 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[50][51].field = black;
        this.block[51][50].field = black;
        this.block[50][50].field = white;
        this.block[51][51].field = white;

        this.kouho_check();
    }
    show(){
        this.field_show();
        this.draw_field();
    }
    draw_field(){

    }
}
class Field_SP_03_01 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        // this.player[0].line_color = "#000000";
        // this.player[1].line_color = "#FFFFFF";

        this.player[0].color = "red";
        this.player[1].color = "blue";

        // this.player[0].Kcolor = "#000000";
        // this.player[1].Kcolor = "#FFFFFF";

        // this.player[0].info_color = "#C8C8C8";
        // this.player[1].info_color = "#C8C8C8";

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        this.kouho_check();
    }
    show(){
        this.field_show();
    }
}
class Field_SP_03_02 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.player[0].Kcolor = "black";
        this.player[0].Kline_color = "white";

        this.player[1].Kcolor = "white";
        this.player[1].Kline_color = "black";

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        this.kouho_check();

        this.blind_block = []

        for(var i = 0; i <= this.size.x+1; i++){
            this.blind_block[i] = []
            for(var j = 0; j <= this.size.y+1; j++){
                this.blind_block[i][j] = new Block(i, j, this.size.x, this.size.y, this.field_move.x, this.field_move.y, this.field_size, this.area);
                this.blind_block[i][j].mass.mass_color = "#00000000";
                this.blind_block[i][j].mass.touch_color = "#00000000";
                this.blind_block[i][j].mass.line_color = "#00000000";
            }    
        }

        this.move = {mode: 0, move: 255, time:0, time_1: 0.5*60, time_2: 1*60, time_3: 2*60};
        this.speed = 0;
        this.y_move = 0;
        this.time = 0;

        this.light_color = 0;
    }
    speed_set(){
        this.speed = 255 / this.move.time;
    }

    show(){
        this.field_show();
        this.draw_field();
        this.draw_move();
    }
    draw_field(){
        this.draw_black();
        for(var i = 1; i <= this.size.x; i++){
            for(var j = 1; j <= this.size.y; j++){
                if(this.block[i][j].field == kouho){
                    this.blind_block[i][j].field = kouho;
                }
                else{
                    this.blind_block[i][j].field = none;
                }

                this.blind_block[i][j].show(this.player, this.BWturn);
            }
        }
    }
    draw_black(){
        fill(0,this.light_color);

        rect(0 ,40 ,canvas.width ,canvas.height-40);

        fill(0,0);
        stroke(this.light_color);

        rect(this.block[1][1].mass.left, this.block[1][1].mass.top, 500, 500);

        for(var i = 1; i <= this.size.x; i++){
            line(this.block[i][1].mass.left, this.block[i][1].mass.top,this.block[i][8].mass.left, this.block[i][8].mass.bottom);
            line(this.block[1][i].mass.left, this.block[1][i].mass.top,this.block[8][i].mass.right, this.block[8][i].mass.top);
        }
        
    }
    draw_move(){
        console.log(this.move.mode);
        if(this.move.mode == 0){
            this.time++;
            if(this.time >= this.move.time_1){
                this.time = 0;
                this.move.mode = 1;
                this.move.time = this.move.time_2;
                this.speed_set();
            }
        }
        else if(this.move.mode == 1 ){
            this.time++;
            this.light_color += this.speed;
            if(this.time >= this.move.time){
                this.move.mode = 2;
                this.time = 0;
            }
        }
        else if(this.move.mode == 2 ){
            if(this.end == 2){
                this.time = 0;
                this.move.mode = 3;
                this.move.time = this.move.time_3;
                this.speed_set();
            }
        }
        else if(this.move.mode == 3 ){
            this.time++;
            this.light_color -= this.speed;
            if(this.time >= this.move.time){
                this.move.mode = 4;
                this.time = 0;
            }
        }
    }
}
class Field_SP_03_03 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.player[0].color = "black";
        this.player[1].color = "white";

        // this.player[1].line_color = "black";
        // this.player[0].line_color = "black";

        this.player[0].Kcolor = "black";
        this.player[0].Kline_color = "white";

        this.player[1].Kcolor = "white";
        this.player[1].Kline_color = "black";

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        this.kouho_check();

        this.blind_block = []

        for(var i = 0; i <= this.size.x+1; i++){
            this.blind_block[i] = []
            for(var j = 0; j <= this.size.y+1; j++){
                this.blind_block[i][j] = new Block(i, j, this.size.x, this.size.y, this.field_move.x, this.field_move.y, this.field_size, this.area);
                this.blind_block[i][j].mass.mass_color = "#00000000";
                this.blind_block[i][j].mass.touch_color = "#00000000";
                this.blind_block[i][j].mass.line_color = "#00000000";
            }    
        }

        this.move = {mode: 0, move: 255, time:0, time_1: 0.5*60, time_2: 1*60, time_3: 2*60};
        this.speed = 0;
        this.y_move = 0;
        this.time = 0;

        this.light_color = 0;
    }
    speed_set(){
        this.speed = 255 / this.move.time;
    }

    show(){
        this.field_show();
        this.draw_field();
        this.draw_move();
    }
    draw_field(){
        this.draw_black();
        for(var i = 1; i <= this.size.x; i++){
            for(var j = 1; j <= this.size.y; j++){
                if(this.block[i][j].field == kouho){
                    this.blind_block[i][j].field = kouho;
                }
                else{
                    this.blind_block[i][j].field = none;
                }

                this.blind_block[i][j].show(this.player, this.BWturn);
            }
        }
    }
    draw_black(){
        fill(0,this.light_color);

        rect(0 ,40 ,canvas.width ,canvas.height-40);
        
    }
    draw_move(){
        console.log(this.move.mode);
        if(this.move.mode == 0){
            this.time++;
            if(this.time >= this.move.time_1){
                this.time = 0;
                this.move.mode = 1;
                this.move.time = this.move.time_2;
                this.speed_set();
            }
        }
        else if(this.move.mode == 1 ){
            this.time++;
            this.light_color += this.speed;
            if(this.time >= this.move.time){
                this.move.mode = 2;
                this.time = 0;
            }
        }
        else if(this.move.mode == 2 ){
            if(this.end == 2){
                this.time = 0;
                this.move.mode = 3;
                this.move.time = this.move.time_3;
                this.speed_set();
            }
        }
        else if(this.move.mode == 3 ){
            this.time++;
            this.light_color -= this.speed;
            if(this.time >= this.move.time){
                this.move.mode = 4;
                this.time = 0;
            }
        }
    }
}
class Field_SP_03_04 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.player[0].line_color = "white"

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        for(var i=1; i<=8; i++){
            for(var j=1; j<=8; j++){
                this.block[i][j].mass.mass_color = "#00000000"
                this.block[i][j].mass.touch_color = "#00000000"
                this.block[i][j].mass.line_color = "#AAAAAA"
            }
        }

        this.x_gage = [];
        this.x_gage[0] = {B: 2, W: 2};

        this.x_turn = 1;

        this.kouho_check();
    }

    show(){
        this.draw_field();
        this.field_show();
        this.Parpar_set();
    }
    draw_field(){
        var start_x = this.block[1][1].mass.pos.x-(500/16);
        var start_y = this.block[1][1].mass.pos.y-(500/16);
        var size_y = 500 / this.x_gage.length;
        
        for(var i=0; i<this.x_gage.length; i++){
            fill(this.player[0].color);
            noStroke();
            rect(start_x, start_y, 500*(this.x_gage[i].B / (this.x_gage[i].B+this.x_gage[i].W)), size_y);
            fill(this.player[1].color);
            rect(start_x+500*(this.x_gage[i].B / (this.x_gage[i].B+this.x_gage[i].W)), start_y, 500*(this.x_gage[i].W / (this.x_gage[i].B+this.x_gage[i].W)), size_y);
        
            start_y += size_y;
        }
    }
    Parpar_set(){
        if(this.turn != this.x_turn){
            this.x_turn = this.turn;

            this.x_gage[this.x_gage.length] = {B: this.player[0].mai, W: this.player[1].mai};
        }
    }

}
class Field_SP_03_05 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(10 ,10 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.player[0].line_color = "white"

        this.block[5][6].field = black;
        this.block[6][5].field = black;
        this.block[5][5].field = white;
        this.block[6][6].field = white;

        for(var i=1; i<=10; i++){
            for(var j=1; j<=10; j++){
                this.block[i][j].mass.mass_color = "#00000000"
                //this.block[i][j].mass.touch_color = "#00000000"
                this.block[i][j].mass.line_color = "#AAAAAA"
            }
        }

        this.x_gage = [];
        this.x_gage[0] = {B: 2, W: 2};

        this.x_turn = 1;

        this.kouho_check();
    }

    show(){
        this.draw_field();
        this.field_show();
        this.Parpar_set();
    }
    draw_field(){
        var start_x = this.block[1][1].mass.pos.x-(500/(this.size.x*2));
        var start_y = this.block[1][1].mass.pos.y-(500/(this.size.y*2));
        var size_y = 500 / this.x_gage.length;
        
        for(var i=0; i<this.x_gage.length; i++){
            fill(this.player[0].color);
            noStroke();
            rect(start_x, start_y, 500*(this.x_gage[i].B / (this.x_gage[i].B+this.x_gage[i].W)), size_y);
            fill(this.player[1].color);
            rect(start_x+500*(this.x_gage[i].B / (this.x_gage[i].B+this.x_gage[i].W)), start_y, 500*(this.x_gage[i].W / (this.x_gage[i].B+this.x_gage[i].W)), size_y);
        
            start_y += size_y;
        }
    }
    Parpar_set(){
        if(this.turn != this.x_turn){
            this.x_turn = this.turn;

            this.x_gage[this.x_gage.length] = {B: this.player[0].mai, W: this.player[1].mai};
        }
    }

}
class Field_SP_03_06 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,7, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        //this.player[0].line_color = "white"

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        for(var i=1; i<=8; i++){
            for(var j=1; j<=8; j++){
                this.block[i][j].pos_size_set(0.5 ,0.5 ,0 ,0);
            }
        }
        this.kouho_check();
    }

    show(){
        this.draw_field();
        this.field_show();
    }
    draw_field(){
        
    }
}
class Field_SP_03_07 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        this.kouho_check();

        this.blind_block = []

        for(var i = 0; i <= this.size.x+1; i++){
            this.blind_block[i] = []
            for(var j = 0; j <= this.size.y+1; j++){
                this.blind_block[i][j] = new Block(i, j, this.size.x, this.size.y, this.field_move.x, this.field_move.y, this.field_size, this.area);
                //  this.blind_block[i][j].mass.mass_color = "white";
                //  this.blind_block[i][j].mass.touch_color = "pink";
                this.blind_block[i][j].mass.line_color = "purple";
            }    
        }

        this.move = {mode: 0, move: -10, time: 4*60};
        this.speed = 0;
        this.y_move = 0;
        this.time = 0;
    }
    speed_set(){
        this.speed = (this.move.move - this.field_move.y) / this.move.time;
    }

    show(){
        this.field_show();
        this.draw_field();
        // this.draw_move();
    }
    draw_field(){
        for(var i = 1; i <= this.size.x; i++){
            for(var j = 1; j <= this.size.y; j++){
                if(this.block[i][j].field == kouho){
                    this.blind_block[i][j].field = kouho;
                }
                else{
                    this.blind_block[i][j].field = none;
                }

                if(this.block[i][j].field == black){
                    this.blind_block[i][j].mass.mass_color = this.player[0].color;    
                }
                else if(this.block[i][j].field == white){
                    this.blind_block[i][j].mass.mass_color = this.player[1].color;    
                }

                this.blind_block[i][j].show(this.player, this.BWturn);
            }
        }
    }
    draw_move(){
        if(this.move.mode == 0){
            if(this.end == 2){
                console.log("xxx");
                this.move.mode = 1;
                this.speed_set();
            }
        }
        else if(this.move.mode == 1 ){
            this.time++;
            this.y_move += this.speed;
            for(var i = 1; i <= this.size.x; i++){
                for(var j = 1; j <= this.size.y; j++){
                    this.blind_block[i][j].ex_pos_set(0, this.y_move);
                }
            }
            if(this.time >= this.move.time){
                this.move.mode = 2;
            }
        }
    }
}
class Field_SP_03_08 extends Field{
    constructor(_play){
        //横サイズ、縦サイズ、横移動、縦移動、サイズ0:自動、ひっくり方向
        super(8 ,8 ,0 ,0 ,0, 8);

        this.player[0].com = _play[0].com;
        this.player[1].com = _play[1].com;

        this.player[0].color = "#000000AA";
        this.player[0].line_color = "white"
        this.player[1].color = "#FFFFFFAA";

        this.block[4][5].field = black;
        this.block[5][4].field = black;
        this.block[4][4].field = white;
        this.block[5][5].field = white;

        for(var i=1; i<=8; i++){
            for(var j=1; j<=8; j++){
                this.block[i][j].mass.mass_color = "#00000000";
                this.block[i][j].mass.touch_color = "#00FF00AA"
                this.block[i][j].mass.line_color = "#000000";
            }
        }

        this.player[0].pos.x = this.block[1][1].mass.pos.x-this.block[1][1].mass.size.x/2;
        this.player[0].size.x = this.block[1][1].mass.size.x * 4;
        this.player[0].size.y = this.block[1][1].mass.size.x * 4;

        this.player[1].pos.x = this.block[5][1].mass.pos.x-this.block[5][1].mass.size.x/2;
        this.player[1].size.x = this.block[5][1].mass.size.x * 4;
        this.player[1].size.y = this.block[5][1].mass.size.x * 4;

        this.gage.pos.y = this.block[1][7].mass.pos.y-this.block[1][7].mass.size.y/2;

        this.gage.size.y = this.block[1][7].mass.size.y * 4;

        this.player[0].pos.x += 0;

        this.kouho_check();
    }

    show(){
        this.draw_field();
        this.field_show();
    }
    draw_field(){

    }

}
//-------------------------------------------------
class Button extends Rect{
    constructor(_text ,_textsize, _num, _x, _y, _posx, _posy){
        super(_x, _y);
        this.num = _num;
        this.pos.x = _posx;
        this.pos.y = _posy;

        this.text = _text;
        this.textsize = _textsize;

        this.color = {touch: "pink" ,nomal: "white"};

    }
    show(){
        if(this.touch_rect()){
            fill(this.color.touch);
        }
        else{
            fill(this.color.nomal);
        }
        strokeWeight(1);
        stroke("black");  
        
        rect(this.left, this.top, this.size.x, this.size.y);

        fill("black");
        textSize(this.textsize);
        textAlign(CENTER, CENTER);
        text(this.text, this.pos.x, this.pos.y);
    }
}
class Back_Button extends Button{
    constructor(){
        super("×",30 , 1, 60, 40, 1000-30, 20);
        this.color.touch = "#AA0000";
        this.color.nomal = "#FF0000"
    }
}
class Menu{
    constructor(){
        this.check = false;

        this.num = 0;

        this.button = [];
        this.button[0] = new Button("8×8",40 ,1, 150, 90, 100, 100);
        this.button[1] = new Button("6×6",40 ,2, 150, 90, 100, 200);
        this.button[2] = new Button("10×10",40 ,3, 150, 90, 100, 300);
        this.button[3] = new Button("Special",40 ,4, 150, 90, 100, 400);

        this.button[4] = new Button("1P:YOU",40 ,10, 200, 90, 700, 100);
        this.button[5] = new Button("2P:COM",40 ,11, 200, 90, 700, 200);
    }
    show(){
        this.check = false;
        for(var i = 0; i< this.button.length; i++){
            this.button[i].show();
            if(this.button[i].touch_rect()){
                this.check = true;
                this.num = this.button[i].num;
            }
        }   
    }
    click_button(){
        if(this.check){
            return this.num;
        }
        else{
            return -1;
        }
    }
}
class Special{
    constructor(){
        this.page = 1;
        this.max_page = 2;
        this.num = 0;
        this.check = false;
        this.page_button = [];
        this.page_button[0] = new Button("＞",30 ,-2, 60, 60, 50, 400);
        this.page_button[1] = new Button("＜",30 ,-3, 60, 60, 50, 300);
        this.button = [];
        // for(var i=0; i<this.max_page; i++){
        //     this.button[i] = [];
        // }
        this.button[0] = [];
        this.button[0][ 0] = new Special_Button( 0 ,"角" ,"8×8" ,2, "オクタゴン");
        this.button[0][ 1] = new Special_Button( 1 ,"廻" ,"8×8" ,3, "無限ループって怖いね");
        this.button[0][ 2] = new Special_Button( 2 ,"縮" ,"8×8" ,1, "少し小さい");
        this.button[0][ 3] = new Special_Button( 3 ,"廻" ,"9×9" ,3, "角が中心に集まる世界");
        this.button[0][ 4] = new Special_Button( 4 ,"円" ,"8×8" ,1, "円形");
        this.button[0][ 5] = new Special_Button( 5 ,"円" ,"8×8" ,2, "ニップ");
        this.button[0][ 6] = new Special_Button( 6 ,"廻" ,"8×8" ,4, "巡り巡る");
        this.button[0][ 7] = new Special_Button( 7 ,"縮" ,"8×8" ,3, "小さめのサイズ");
        this.button[0][ 8] = new Special_Button( 8 ,"拡" ,"8×8" ,3, "大きめのサイズ");
        this.button[0][ 9] = new Special_Button( 9 ,"枚" ,"8×8" ,2, "-5~5枚");
        this.button[0][10] = new Special_Button(10 ,"拡" ,"8×8" ,2, "マスの拡大");
        this.button[0][11] = new Special_Button(11 ,"拡" ,"8×8" ,4, "やや中央");
        this.button[0][12] = new Special_Button(12 ,"斜" ,"17×8" ,4, "//////////////");
        this.button[0][13] = new Special_Button(13 ,"角" ,"9×9" ,4, "蜂の巣オセロ");
        this.button[0][14] = new Special_Button(14 ,"斜" ,"12×8" ,4, "//////////////-6 remix");
        this.button[0][15] = new Special_Button(15 ,"割" ,"16×16" ,2, "quarter____");
        this.button[0][16] = new Special_Button(16 ,"角" ,"9×9" ,2, "Δストリーム");
        this.button[0][17] = new Special_Button(17 ,"割" ,"16×16" ,3, "re:quarter____");
        this.button[0][18] = new Special_Button(18 ,"改" ,"9×8" ,2, "ver002オセロ");
        this.button[0][19] = new Special_Button(19 ,"虹" ,"8×8" ,4, "コマが線になっちゃった");

        this.button[1] = [];
        this.button[1][ 0] = new Special_Button( 0 ,"双" ,"17×8" ,3, "Specialな盤面を楽しんでください");
        this.button[1][ 1] = new Special_Button( 1 ,"縮" ,"8×8" ,2, "縦長");
        this.button[1][ 2] = new Special_Button( 2 ,"廻" ,"8×8" ,5, "ぐるぐる");
        this.button[1][ 3] = new Special_Button( 3 ,"拡" ,"8×8" ,3, "にょーーーーん");
        this.button[1][ 4] = new Special_Button( 4 ,"絵" ,"8×8" ,2, "ガイド線テスト");
        this.button[1][ 5] = new Special_Button( 5 ,"虹" ,"8×8" ,3, "自由空間");
        this.button[1][ 6] = new Special_Button( 6 ,"？" ,"8×8" ,4, "パーセントフィールド");
        this.button[1][ 7] = new Special_Button( 7 ,"絵" ,"8×8" ,4, "死角だらけ");
        this.button[1][ 8] = new Special_Button( 8 ,"虹" ,"8×8" ,5, "白って200色あんねん");
        this.button[1][ 9] = new Special_Button( 9 ,"尖" ,"8×8" ,4, "拡大と縮小");
        this.button[1][10] = new Special_Button(10 ,"円" ,"8×8" ,2, "ニップ　〜リマスター〜");
        this.button[1][11] = new Special_Button(11 ,"絵" ,"8×8" ,1, "ビーム");
        this.button[1][12] = new Special_Button(12 ,"絵" ,"8×8" ,3, "超ビーム");
        this.button[1][13] = new Special_Button(13 ,"双" ,"8×17" ,2, "two round Battle");
        this.button[1][14] = new Special_Button(14 ,"角" ,"12×12" ,3, "至って普通の盤面");
        this.button[1][15] = new Special_Button(15 ,"角" ,"4×4" ,3, "普通(?)の盤面");
        this.button[1][16] = new Special_Button(16 ,"縮" ,"8×8" ,5, "視力2.0");
        this.button[1][17] = new Special_Button(17 ,"角" ,"30×30" ,5, "900マスの戦い");
        this.button[1][18] = new Special_Button(18 ,"隠" ,"8×8" ,4, "目隠しオセロ");
        this.button[1][19] = new Special_Button(19 ,"枚" ,"8×8" ,2, "マイナス枚");

        this.button[2] = [];
        this.button[2][ 0] = new Special_Button( 0 ,"角" ,"00×00" ,5, "サイコーに狂った勝負(100×100)");
        this.button[2][ 1] = new Special_Button( 1 ,"虹" ,"8×8" ,1, "赤 vs 青");
        this.button[2][ 2] = new Special_Button( 2 ,"隠" ,"8×8" ,2, "停電");
        this.button[2][ 3] = new Special_Button( 3 ,"隠" ,"8×8" ,4, "停電(ガイド線なし)");
        this.button[2][ 4] = new Special_Button( 4 ,"？" ,"8×8" ,4, "超パーセントフィールド");
        this.button[2][ 5] = new Special_Button( 5 ,"？" ,"10×10" ,5, "超超パーセントフィールド");
        this.button[2][ 6] = new Special_Button( 6 ,"縮" ,"8×8" ,2, "手のひらに乗る大きさ");
        this.button[2][ 7] = new Special_Button( 7 ,"角" ,"8×8" ,1, "スクエアピース");
        this.button[2][ 8] = new Special_Button( 8 ,"透" ,"8×8" ,2, "情報網");
    }
    show(){
        this.check = false;
        for(var i=0; i<this.button[this.page-1].length; i++){
            this.button[this.page-1][i].show();

            if(this.button[this.page-1][i].touch_rect()){
                this.check = true;
                this.num = this.button[this.page-1][i].num;
            }
        }
        for(var i=0; i<this.page_button.length; i++){
            this.page_button[i].show();


            if(this.page_button[i].touch_rect()){
                this.check = true;
                this.num = this.page_button[i].num;
            }
        }
        // console.log(this.num)
    }
    click_button(){
        if(this.check){
            return this.num;
        }
        else{
            return -1;
        }
    }
}

class Special_Button extends Rect{
    constructor(_num,_zokusei ,_fieldsize ,_star ,_comment){
        super(200, 80);
        this.num = _num;
        this.zokusei = _zokusei;
        this.field_size = _fieldsize;
        this.star ="";
        for(var i=0; i<_star; i++){
            this.star += "★";
        }
        this.comment = _comment;
        this.pos.x = this.set_pos_x();
        this.pos.y = this.set_pos_y();

        this.color = {touch: "pink" ,nomal: "white"};

    }
    set_pos_x(){
        if(this.num >=0 && this.num < 5){
            return ((canvas.width / 5)+10 ) * 1;
        }
        else if(this.num >=5 && this.num < 10){
            return ((canvas.width / 5)+10 )* 2;
        }
        else if(this.num >=10 && this.num < 15){
            return ((canvas.width / 5)+10 )* 3;
        }
        else if(this.num >=15 && this.num < 20){
            return ((canvas.width / 5)+10 )* 4;
        }
    }

    set_pos_y(){
       return (canvas.height / 6) * (this.num % 5 + 1)
    }
    
    show(){
        if(this.touch_rect()){
            fill(this.color.touch);
        }
        else{
            fill(this.color.nomal);
        }
        stroke("black");  
        
        rect(this.left, this.top, this.size.x, this.size.y);

        fill("black");
        textSize(40);
        textAlign(LEFT, TOP);
        text(this.field_size, this.left+10, this.top+10);

        textSize(30);
        textAlign(RIGHT, TOP);
        text(this.zokusei, this.right-20, this.top+10);

        textSize(10);
        textAlign(LEFT, TOP);
        text(this.star, this.right-55, this.bottom-40);

        //コメント
        textSize(12);
        textAlign(LEFT, BOTTOM);
        text(this.comment, this.left+5, this.bottom-10);
    }
}

//---------------------------------------------------------------
class Game_var{
    constructor(){
        this.check = false;
        this.button = new Back_Button;

        this.var = new Rect(1000, 40)
        this.var.pos.x = 500;
        this.var.pos.y = 20;
    }
    show(){
        this.check = false;

        fill(0);
        stroke(0);
        rect(this.var.left, this.var.top, this.var.size.x, this.var.size.y)

        this.button.show();
    }
    back_click(){
        if(this.button.touch_rect()){
            return true;
        }
        return false;
    }
}

//-------------------------------------------------
//スタート画面
class Game_scene{
    constructor(){
        this.scene = Smenu;

        this.menu = new Menu;

        this.special = new Special;

        this.gamevar = new Game_var;
        this.field;

        this.player = [];
        this.player[0] = new Player_set(0);
        this.player[1] = new Player_set(1);
    }

    show(){
        //ゲーム画面
        if(this.scene == Sgame){
            this.gamevar.show();
            this.field.show();
        }
        //メニュー
        else if(this.scene == Smenu){
            this.menu.show();
        }
        //スペシャル
        else if(this.scene == Sspecial){
            this.gamevar.show();
            this.special.show();
        }
    }

    click_field(){
        //ゲーム画面
        if(this.scene == Sgame){
            this.field.click_mass();

            if(this.gamevar.back_click()){
                this.scene = Smenu;
            }
        }
        //メニュー
        else if(this.scene == Smenu){
            if(this.menu.click_button() != -1){
                this.field_set(this.menu.click_button());
            }
        }
        else if(this.scene == Sspecial){
            if(this.special.click_button() != -1){
                // console.log(this.special.click_button())
                this.special_field_set(this.special.click_button());
            }

            if(this.gamevar.back_click()){
                this.scene = Smenu;
            }
        }
    }
    field_set(num){
        if(num == 1){
            this.field = new Field_nomal(8,8 ,this.player);
            // this.field = new Field_nomal_nip();
            this.scene = Sgame;
        }
        else if(num == 2){
            this.field = new Field_nomal(6,6,this.player);
            this.scene = Sgame;
        }
        else if(num == 3){
            this.field = new Field_nomal(10,10,this.player);
            this.scene = Sgame;
        }
        else if(num == 4){
            this.scene = Sspecial;
        }
        else if(num == 10 || num == 11){
            if(this.player[num-10].com == 0){
                this.player[num-10].com = 1;
                this.menu.button[num-6].text = num-9 + "P:COM";

            }
            else if(this.player[num-10].com == 1){
                this.player[num-10].com = 0;
                this.menu.button[num-6].text = num-9 + "P:YOU";
            }
        }
    }
    set_com(){
        this.field.player[0].com = this.player[0].com;
        this.field.player[1].com = this.player[1].com;
    }
    special_field_set(num){
        if(num == -2){
            this.special.page++;
            if(this.special.page > this.special.button.length){
                this.special.page = 1;
            }
        }
        else if(num == -3){
            this.special.page--;
            if(this.special.page < 1){
                this.special.page = this.special.button.length;
            }
        }
        else if(this.special.page == 1){
            if(num == 0){
                this.field = new Field_SP_01_00(this.player);
                this.scene = Sgame;
            }
            else if(num == 1){
                this.field = new Field_SP_01_01(this.player);
                this.scene = Sgame;
            }
            else if(num == 2){
                this.field = new Field_SP_01_02(this.player);
                this.scene = Sgame;
            }
            else if(num == 3){
                this.field = new Field_SP_01_03(this.player);
                this.scene = Sgame;
            }
            else if(num == 4){
                this.field = new Field_SP_01_04(this.player);
                this.scene = Sgame;
            }
            else if(num == 5){
                this.field = new Field_SP_01_05(this.player);
                this.scene = Sgame;
            }
            else if(num == 6){
                this.field = new Field_SP_01_06(this.player);
                this.scene = Sgame;
            }
            else if(num == 7){
                this.field = new Field_SP_01_07(this.player);
                this.scene = Sgame;
            }
            else if(num == 8){
                this.field = new Field_SP_01_08(this.player);
                this.scene = Sgame;
            }
            else if(num == 9){
                this.field = new Field_SP_01_09(this.player);
                this.scene = Sgame;
            }
            else if(num == 10){
                this.field = new Field_SP_01_10(this.player);
                this.scene = Sgame;
            }
            else if(num == 11){
                this.field = new Field_SP_01_11(this.player);
                this.scene = Sgame;
            }
            else if(num == 12){
                this.field = new Field_SP_01_12(this.player);
                this.scene = Sgame;
            }
            else if(num == 13){
                this.field = new Field_SP_01_13(this.player);
                this.scene = Sgame;
            }
            else if(num == 14){
                this.field = new Field_SP_01_14(this.player);
                this.scene = Sgame;
            }
            else if(num == 15){
                this.field = new Field_SP_01_15(this.player);
                this.scene = Sgame;
            }
            else if(num == 16){
                this.field = new Field_SP_01_16(this.player);
                this.scene = Sgame;
            }
            else if(num == 17){
                this.field = new Field_SP_01_17(this.player);
                this.scene = Sgame;
            }
            else if(num == 18){
                this.field = new Field_SP_01_18(this.player);
                this.scene = Sgame;
            }
            else if(num == 19){
                this.field = new Field_SP_01_19(this.player);
                this.scene = Sgame;
            }
        }
        else if(this.special.page == 2){
            if(num == 0){
                this.field = new Field_SP_02_00(this.player);
                this.scene = Sgame;
            }
            else if(num == 1){
                this.field = new Field_SP_02_01(this.player);
                this.scene = Sgame;
            }
            else if(num == 2){
                this.field = new Field_SP_02_02(this.player);
                this.scene = Sgame;
            }
            else if(num == 3){
                this.field = new Field_SP_02_03(this.player);
                this.scene = Sgame;
            }
            else if(num == 4){
                this.field = new Field_SP_02_04(this.player);
                this.scene = Sgame;
            }
            else if(num == 5){
                this.field = new Field_SP_02_05(this.player);
                this.scene = Sgame;
            }
            else if(num == 6){
                this.field = new Field_SP_02_06(this.player);
                this.scene = Sgame;
            }
            else if(num == 7){
                this.field = new Field_SP_02_07(this.player);
                this.scene = Sgame;
            }
            else if(num == 8){
                this.field = new Field_SP_02_08(this.player);
                this.scene = Sgame;
            }
            else if(num == 9){
                this.field = new Field_SP_02_09(this.player);
                this.scene = Sgame;
            }
            else if(num == 10){
                this.field = new Field_SP_02_10(this.player);
                this.scene = Sgame;
            }
            else if(num == 11){
                this.field = new Field_SP_02_11(this.player);
                this.scene = Sgame;
            }
            else if(num == 12){
                this.field = new Field_SP_02_12(this.player);
                this.scene = Sgame;
            }
            else if(num == 13){
                this.field = new Field_SP_02_13(this.player);
                this.scene = Sgame;
            }
            else if(num == 14){
                this.field = new Field_SP_02_14(this.player);
                this.scene = Sgame;
            }
            else if(num == 15){
                this.field = new Field_SP_02_15(this.player);
                this.scene = Sgame;
            }
            else if(num == 16){
                this.field = new Field_SP_02_16(this.player);
                this.scene = Sgame;
            }
            else if(num == 17){
                this.field = new Field_SP_02_17(this.player);
                this.scene = Sgame;
            }
            else if(num == 18){
                this.field = new Field_SP_02_18(this.player);
                this.scene = Sgame;
            }
            else if(num == 19){
                this.field = new Field_SP_02_19(this.player);
                this.scene = Sgame;
            }
        }
        else if(this.special.page == 3){
            if(num == 0){
                this.field = new Field_SP_03_00(this.player);
                this.scene = Sgame;
            }
            else if(num == 1){
                this.field = new Field_SP_03_01(this.player);
                this.scene = Sgame;
            }
            else if(num == 2){
                this.field = new Field_SP_03_02(this.player);
                this.scene = Sgame;
            }
            else if(num == 3){
                this.field = new Field_SP_03_03(this.player);
                this.scene = Sgame;
            }
            else if(num == 4){
                this.field = new Field_SP_03_04(this.player);
                this.scene = Sgame;
            }
            else if(num == 5){
                this.field = new Field_SP_03_05(this.player);
                this.scene = Sgame;
            }
            else if(num == 6){
                this.field = new Field_SP_03_06(this.player);
                this.scene = Sgame;
            }
            else if(num == 7){
                this.field = new Field_SP_03_07(this.player);
                this.scene = Sgame;
            }
            else if(num == 8){
                this.field = new Field_SP_03_08(this.player);
                this.scene = Sgame;
            }
        }
    }
}