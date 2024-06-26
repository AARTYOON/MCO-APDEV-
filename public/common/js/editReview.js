document.addEventListener('DOMContentLoaded', function () {
    var reviewForm = document.getElementById("reviewform");

    if (!reviewForm) {
        console.error("Review form element not found");
        return;
    }

    reviewForm.addEventListener('submit', function (event) {
        event.preventDefault(); 
        
        var recommendations = document.getElementsByName("recommendation");
        var checked = "";
        for(const reco of recommendations){
            if(reco.checked){
                checked = reco.value === "recommended";
                break;
            }
        }
        var textReviewValue = document.getElementById("review").value;
        var restoname = document.getElementById("hiddenval").value; 
        var reviewId = document.getElementById("hiddenrev").value; 
        
        if (checked === "" || textReviewValue === '') {
            alert('Please fill out all required fields.' + checked);
            return false; 
        }

        fetch(`/restaurant/${restoname}/update-reviews`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                reviewId: reviewId,
                restoname: restoname,
                isRecommend: checked,
                textReview: textReviewValue 
            })
        })
        .then(response => {
            console.log(response)
            if (response.ok) {
                console.log('Review edited successfully');
                return response.json();
            } else {
                console.error('Failed to edit review');
                return Promise.reject(response)
            }
        }).then(data => {
            window.location.href = '/restaurant/' + document.getElementById("hiddenval").value;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    var cancelBtn = document.getElementById('cancel');

    if (!cancelBtn) {
        console.error("Cancel button element not found");
        return;
    }

    cancelBtn.addEventListener('click', function (event) {
        event.preventDefault();
        window.history.back();
    });
});
