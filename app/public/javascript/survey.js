$(document).ready(function () {
    // Questions array
    var questions = [
        'I prefer Vodka over Wine - anyplace and anytime.',
        'I am extraordinarily sexy to both men and women. Even animals love me',
        'I would perfer a fish tank with a Piranha over a Shark.',
        'My nights are long and my days are short.',
        'I know exatly what was inside that box in Pulp Fiction.',
        'I would rather skydive than skindive.',
        'There is no better seafood than in New Orleans.',
        'Life is a crap shoot and all you do is roll the dice and hope.',
        'Movie stars are way cooler than athletes.',
        'I prefer action movies over comedies.'
    ];

    // Choices .
    var choices = [
        '1 (Strongly Disagree)',
        '2 (Disagree)',
        '3 (Neutral)',
        '4 (Agree)',
        '5 (Strongly Agree)'
    ];


    var questionDiv = $('#questions');
    i = 0;

    questions.forEach(function (question) {
        i++;

        var item = $('<div class="question">');
        var headline = $('<h4>').text('Question ' + i);
        var questionText = $('<p>').text(question);
        var dropDown = $('<div class="form-group">');
        var select = $('<select class="form-control selector">');
        // Create an option for each choice.
        choices.forEach(function (choice) {
            var option = $('<option>').text(choice);
            select.append(option);
        });
        select.attr('id', 'select' + i);
        // Add the dropdown to the item, then add the item to the questions div.
        dropDown.append(select);
        item.append(headline, questionText, dropDown);
        var br = $('<br>');
        questionDiv.append(item, br);
    });

    $('#submit').on('click', function (event) {

        event.preventDefault();

        // Capture username and image link values.
        var userName = $('#userName').val();
        var imageLink = $('#imageLink').val();

        // If both of those items were filled out, gather other answers and submit.
        if (userName.length > 0   
            /*&& imageLink.length > 0 */) {
            var answers = [];

            // Add the response for each selector to the array of answers.
            Object.keys($('.selector')).forEach(function (key) {
                if (answers.length < questions.length) {
                    // Take only the first character of the answer, which is the number.
                    answers.push($('.selector')[key].value.charAt(0));
                }
            });

            var surveyData = {
                name: userName,
                photo: imageLink,
                answers: answers
            };

            $.post('/api/friends', surveyData, function (data) {

                if (data) {

                    // Empty out modal and username and link fields.
                    $('#modalContent').empty();
                    $('#userName').val('');
                    $('#imageLink').val('');

                    data.forEach(function (profile) {
                        var profileDiv = $('<div class="profile">');
                        var name = profile.name;
                        var photoURL = profile.photo;
                        // Put the name in a header.
                        var nameHeader = $('<h3>').text(name);
                        // Add a photo with an 'src' of the photoURL submitted.
                        //var myPhoto = $('<img>').attr('src', imageLink);
                        var photo = $('<img>').attr('src', photoURL);
                        //profileDiv.append(myPhoto, nameHeader,  photo);
                        profileDiv.append(nameHeader, photo);

                        // Add these items to the modal.
                        $('#modalContent').append(profileDiv);
                    });


                    if (data.length > 1) {
                        // header is plural.
                        $('.modal-title').text(userName + ', your best Hollywood buddies would be:');
                    } else {
                        // header is singular.
                        $('.modal-title').text(userName + ', your best Hollywood buddy match is:');
                    }

                    $('#resultModal').modal();
                }
            });

        } else {
            $('#errorModal').modal();
            setTimeout(function () {
                $('#errorModal').modal('hide');
            }, 4000);
        }
    });
});
