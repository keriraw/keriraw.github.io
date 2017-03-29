update();
function update ()
{
	clearAll();
	var values = []
	,	valid = 0
	,	dupes = false
	;
	for(let i = 0; i <= 8; i++)
	{
		values.push(document.getElementById('n'+i).value);
	}
	values.forEach(function(value)
	{
		if (value)
		{
			valid++;
		}
	});

	if (valid === 9)
	{
		values.forEach(function(v1, index1)
		{
			values.forEach(function(v2, index2)
			{
				if (index1 !== index2)
				{
					if (v1 === v2)
					{
						dupes = true;
					}
				}
			})
		})

		if (!dupes)
		{
			document.getElementById('d1').innerHTML = pow2(values[2]) + pow2(values[4]) + pow2(values[6]);
			document.getElementById('d2').innerHTML = pow2(values[0]) + pow2(values[4]) + pow2(values[8]);
			document.getElementById('f1').innerHTML = pow2(values[0]) + pow2(values[1]) + pow2(values[2]);
			document.getElementById('f2').innerHTML = pow2(values[3]) + pow2(values[4]) + pow2(values[5]);
			document.getElementById('f3').innerHTML = pow2(values[6]) + pow2(values[7]) + pow2(values[8]);
			document.getElementById('c1').innerHTML = pow2(values[0]) + pow2(values[3]) + pow2(values[6]);
			document.getElementById('c2').innerHTML = pow2(values[1]) + pow2(values[4]) + pow2(values[7]);
			document.getElementById('c3').innerHTML = pow2(values[2]) + pow2(values[5]) + pow2(values[8]);
		}
		else
		{
			document.getElementById('info').innerHTML = 'There are dupes';
		}
		// no dupes
	}
	else
	{
		document.getElementById('info').innerHTML = 'Some numbers are empty';
	}
	// document.getElementById('d1').innerHTML = pow2(2) + pow2(4) + pow2(6);
};

function pow2 (a)
{
	return Math.pow(a, 2);
};

function clearAll ()
{
	document.getElementById('info').innerHTML = '';
	document.getElementById('d1').innerHTML = '-';
	document.getElementById('d2').innerHTML = '-';
	document.getElementById('f1').innerHTML = '-';
	document.getElementById('f2').innerHTML = '-';
	document.getElementById('f3').innerHTML = '-';
	document.getElementById('c1').innerHTML = '-';
	document.getElementById('c2').innerHTML = '-';
	document.getElementById('c3').innerHTML = '-';
}