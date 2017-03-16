module.exports = function(x,y,callback) {
	try {
		if(x<=0 || y<0) {
			throw new Error ("Those numbers should be greater than 0");
		}
		else 
			callback(null, {
				perimeter:function() {
					return ((x+y) * 2);
				},
				area:function() {
					return (x*y);
				}
			});
		}
	catch (error) {
		callback(error,null);
	}
}