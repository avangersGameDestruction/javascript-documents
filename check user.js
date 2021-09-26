User.getUserByUsername(username, function(err, user) { //must check if user exists
    if (err) throw err;
    if (user) {
        console.log('existing...'); //may be deleted
        req.flash('error_msg', 'This username already exists');
        res.redirect('/users/register');
    } else {
        User.createUser(newUser, function(err, user) {
            if (err) throw err;
            console.log(user); //may be deleted
        });

        req.flash('success_msg', 'You registered successfuly and you can now login');
        res.redirect('/users/login');
    }
})