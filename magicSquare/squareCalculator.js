var values = []
,	maxValue = maxF() || 10
,	tNum
;

for (let x = 1; x <= maxValue; x++)
{
	for (let y = 1; y <= maxValue; y++)
	{
		for (let z = 1; z <= maxValue; z++)
		{
			if (z != y && z != x && x != y)
			{
				tNum = [x,y,z].sort();
				if (!values.some(function(value) { return value.num.toString() == tNum; }))
				{
					values.push({num: tNum, result: pow2(x)+pow2(y)+pow2(z)});
				}
			}
		}
	}
}

console.log(JSON.stringify(values));

function pow2 (a)
{
	return Math.pow(a, 2);
};

function maxF ()
{
	var max;
	process.argv.forEach(function (arg, index)
	{
		if (arg == '--max')
		{
			max = process.argv[index+1];
		}
	});
	return max;
}

// node --max_old_space_size=2048 squareCalculator.js > values.txt --max 100