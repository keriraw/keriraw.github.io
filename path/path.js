var ebg = document.getElementById('bgc')
,	cbg = ebg.getContext('2d')
,	epg = document.getElementById('pgc')
,	cpg = epg.getContext('2d')
,	configs = {
		gameSpeed: 5
	,	tileSize: 50
	,	playerSize: 10
	}
,	game = {
		status: 'load'
	}
,	palette = {
	 	wall: '#000'
	,	floor: '#FFF'
	,	objective: '#0F0'
	,	player: '#F00'
	}
,	mapa = null
,	player = null
;

(function controller ()
{
	clearAll();
	if (game.status === 'load')
	{
		createNewGame();
	}
	else if (game.status === 'over')
	{
		newGameScreen();
		epg.removeEventListener('keydown', player.move)
		epg.addEventListener('click', createNewGame);
	}
	else if (game.status === 'play')
	{
		mapa.draw();
		player.draw();
		epg.addEventListener('keydown', player.move)
	}
	window.requestAnimationFrame(controller);
})();

function createNewGame ()
{
	epg.removeEventListener('click', createNewGame);
	mapa = new Mapa();
	mapa.create();
	player = new Player();
	player.create();
	game.status = 'play';
};

function Player ()
{
	self = this;

	this.coord = {};
	this.pos = {};

	this.create = function create ()
	{
		// needs to be generated dynamically
		// starts in the middle of pos: 0,0
		this.coord.x = configs.tileSize/2;
		this.coord.y = configs.tileSize/2;
	}

	this.draw = function draw ()
	{
		cpg.beginPath();
		cpg.fillStyle = palette.player;
		cpg.arc(this.coord.x,this.coord.y,configs.playerSize,0,2*Math.PI);
		cpg.fill();
	}

	this.move = function move (key)
	{
		// Fix clipping on walls
		self.pos.x = Math.floor(self.coord.x/configs.tileSize);
		self.pos.y = Math.floor(self.coord.y/configs.tileSize);
		if (key.keyCode === 39)
		{
			// RIGHT
			if (mapa.layout[self.pos.y][self.pos.x+1] && mapa.layout[self.pos.y][self.pos.x+1] !== 1 || (self.pos.x+1)*configs.tileSize > self.coord.x + configs.playerSize)
			{
				self.coord.x += configs.gameSpeed;
			}
		}
		else if (key.keyCode === 40)
		{
			// DOWN
			if (mapa.layout[self.pos.y+1] && mapa.layout[self.pos.y+1][self.pos.x] !== 1 || (self.pos.y+1)*configs.tileSize > self.coord.y + configs.playerSize)
			{
				self.coord.y += configs.gameSpeed;
			}
		}
		else if (key.keyCode === 37)
		{
			// LEFT
			if (mapa.layout[self.pos.y][self.pos.x-1] && mapa.layout[self.pos.y][self.pos.x-1] !== 1 || (self.pos.x)*configs.tileSize < self.coord.x - configs.playerSize)
			{
				self.coord.x -= configs.gameSpeed;
			}
		}
		else if (key.keyCode === 38)
		{
			// UP
			if (mapa.layout[self.pos.y-1] && mapa.layout[self.pos.y-1][self.pos.x] !== 1 || (self.pos.y)*configs.tileSize < self.coord.y - configs.playerSize)
			{
				self.coord.y -= configs.gameSpeed;
			}
		}
		if (mapa.layout[self.pos.y][self.pos.x] === 3)
		{
			game.status = 'over';
		}
	}
}

function Mapa ()
{
	this.create = function create ()
	{
		// Needs to be generated dynamically
		this.layout = [
			[2,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1]
		,	[2,1,1,1,2,1,1,1,3,1,1,1,1,2,1,1]
		,	[2,1,1,2,2,2,1,1,2,2,2,2,2,2,2,2]
		,	[2,1,1,2,1,2,2,2,2,1,1,1,1,1,1,2]
		,	[2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,2]
		,	[1,1,1,2,2,2,2,2,2,1,1,1,1,1,1,2]
		,	[2,1,1,1,1,1,1,1,2,2,2,2,1,1,1,2]
		,	[2,1,2,2,2,2,2,2,2,1,1,2,2,1,1,2]
		,	[2,2,2,1,1,1,1,1,2,1,1,1,2,1,1,2]
		,	[2,1,1,1,1,1,1,1,2,2,1,1,2,2,2,2]
		,	[2,1,1,1,1,1,1,1,1,2,1,1,3,1,3,1]
		,	[2,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1]
		]
	}

	this.draw = function draw ()
	{
		this.layout.forEach(function (value1, index1){
			value1.forEach(function (value2, index2){
				if (value2 === 1)
				{
					cbg.fillStyle = palette.wall;
				}
				else if (value2 === 2)
				{
					cbg.fillStyle = palette.floor;
				}
				else if (value2 === 3)
				{
					cbg.fillStyle = palette.objective;
				}
				cbg.fillRect((index2)*configs.tileSize,(index1)*configs.tileSize,configs.tileSize,configs.tileSize);
			})
		})
	}
}

function clearAll ()
{
	cbg.clearRect(0,0,800,600);
	cpg.clearRect(0,0,800,600);
};

function newGameScreen ()
{
	cpg.font = "45px monospace";
	cpg.fillStyle = "white";
	cpg.textAlign = "center";
	cpg.fillText('GAME OVER',400,100);
	cpg.font = "25px monospace";
	cpg.fillText('Click anywhere to advance to the next level',400,150);
};