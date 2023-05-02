exports.clockIn = function(req, res) {
    User.findById(req.user.id, function(err, user) {
      if (err) {
        return res.status(500).send('Error on the server.');
      }
      if (!user) {
        return res.status(404).send('User not found.');
      }
      if (user.clockInTime) {
        return res.status(400).send('User already clocked in.');
      }
      user.clockInTime = new Date();
      user.save(function(err) {
        if (err) {
          return res.status(500).send('Error on the server.');
        }
        res.send('Clocked in successfully.');
      });
    });
  };
  
  exports.startBreak = function(req, res) {
    User.findById(req.user.id, function(err, user) {
      if (err) {
        return res.status(500).send('Error on the server.');
      }
      if (!user) {
        return res.status(404).send('User not found.');
      }
      if (!user.clockInTime) {
        return res.status(400).send('User has not clocked in yet.');
      }
      if (user.breakStartTime) {
        return res.status(400).send('User already on break.');
      }
      user.breakStartTime = new Date();
      user.save(function(err) {
        if (err) {
          return res.status(500).send('Error on the server.');
        }
        res.send('Break started successfully.');
      });
    });
  };
  
  exports.endBreak = function(req, res) {
    User.findById(req.user.id, function(err, user) {
      if (err) {
        return res.status(500).send('Error on the server.');
      }
      if (!user) {
        return res.status(404).send('User not found.');
      }
      if (!user.breakStartTime) {
        return res.status(400).send('User is not on break.');
      }
      if (user.breakEndTime) {
        return res.status(400).send('User has already ended break.');
      }
      user.breakEndTime = new Date();
      user.save(function(err) {
        if (err) {
          return res.status(500).send('Error on the server.');
        }
        res.send('Break ended successfully.');
      });
    });
  };
  
  exports.clockOut = function(req, res) {
    User.findById(req.user.id, function(err, user) {
      if (err) {
        return res.status(500).send('Error on the server.');
      }
      if (!user) {
        return res.status(404).send('User not found.');
      }
      if (!user.clockInTime) {
        return res.status(400).send('User has not clocked in yet.');
      }
      if (user.clockOutTime) {
        return res.status(400).send('User already clocked out.');
      }
      user.clockOutTime = new Date();
      user.save(function(err) {
        if (err) {
          return res.status(500).send('Error on the server.');
        }
        res.send('Clocked out successfully.');
      });
    });
  };
  