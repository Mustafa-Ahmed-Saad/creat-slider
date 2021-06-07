// get img in slider-contrainer
// هجمع كل الصور بتعتي في اراي و علشان فيما بعد ابقي اختار منهم اللي انا عاوزة و لما ازود واحد علي الاندكس بتاع صورة معينة يجبلي اللي بعها و هاكذا
var sliderImages = Array.from(document.querySelectorAll('.slider-container img'));  // الارايفروم بتستخدمها علشان تجيب العناصر اللي هتحطها بين الاقواس لو استرنج مثلا هتحولك السترنج ل احرف و هتنفز علي كل عنصر من العناصر اللي هتحطها في الاراي الفانكشن او الايرو فانكشن اللي هتكون بعد الكوما لو انت عاوزتنفز علي كل عنصر من عناصر الاراي حاجة معينة

// get numbers of slides or image in this array
// لازم اجيب عدد العناصر او عدد الصور اللي في الاراي بتعتي علشان اثدر اعرف هعمل كام ال اي في الليست علشان لما ادوس علي الال اي دي او اللي بنسميها البادجينيشن بجبلي صورة معينة من اللي في الاراي دي فلازم علشان اعمل دا كلو اكون عارف عدد الصوراللي انا جبتهم في الاراي دي
var slidesCount = sliderImages.length;

// first slide will show or main slide 
// السليدر دا اللي عي اساسو هيجيب الاندكس بتاعو و بعدين يزود واحد لما يضغط علي النيكست فهيجبلو الصورة اللي بعدهاولازم ابدا فلازم احدد السليد اللي هوا اول سليد هيظهر علشان بقي اكمل بعد كدا لما يدوس علي حاجة يجيب السليد دا و يشوف افاندكس بتاعي و يزود علية واحد او يقلل منو واحد او كدا
var currentSlideIndex = parseInt(localStorage.getItem('slideNum')) || 1;

// get slider number element that show the number of current slide or img
var sliderNumberElement = document.getElementById('slide-number');

// previous and next buttons
var nextButton = document.getElementById('next');
var prevButton = document.getElementById('prev');

// handle onclick on previous and next button
nextButton.onclick = nextSlider;
prevButton.onclick = prevSlider;

// create ul pagination list and set id
var paginationElement = document.createElement('ul');
paginationElement.setAttribute('id', 'pagination-ul');
// create lis
for (var i = 1; i <= slidesCount; i++) { // or // var i = 0; i < slidesCount // or i < sliderImages.length
    var li = document.createElement('li');
    // var fullLi = li.appendChild(document.createTextNode(i)); // dont fo that
    li.appendChild(document.createTextNode(i));
    li.setAttribute('data-index', i);
    paginationElement.appendChild(li); // or // prependChild to set li in the ferst but appendChild set li in the last
} // add the full ul to the span indicators
document.getElementById('indicators').appendChild(paginationElement);

// get the paginationElement ul
var paginationCreatedUl = document.getElementById('pagination-ul');

var paginationBullets = Array.from(document.querySelectorAll('#pagination-ul li'));

// loop through all bullets items
for (var i = 0; i < paginationBullets.length; i++) {
    paginationBullets[i].onclick = function() { // we can use addEventListener
        currentSlideIndex = parseInt(this.getAttribute('data-index')); /* law makatabtesh this elfanekshan mesh hateshta8al lazem hena tektab this */   // استخدمنا بارس انت علشان الرقم لما يرجع هيكون استرنج و اخنا عاوزين نحولو لقم مش استنرج ممكن منعملهاش بس كدا صح الصح
        theChecker();
    }
}

// trigger the checker function
/* لازم هنا تشغل الفانكشن علشان تبدا و تظهرلك الصورة علي حسب الكارنت سليد اندكس اللي انت حددتو لانك لو مشغلتش الفانكشن هيكون كل الصور الاوباستي بتاعتها صفر و كمان كل لازم حد يضغط علي النكس او اي زرار علشان الفانكشن تشتغل و يظهر صور و دا مش كويس فانت لازم تشغلها علشان تبدا تاخد الكارنت اندكس و تدي كلاس اكتيف للصورة و كلاس اكتيف للبوليت و كلاس ديسيبول للنكست او للبريفس لو كانت اول او اخر صورة */
theChecker()

// next slide function
function nextSlider() {
    if (nextButton.classList.contains('disabled')) {
        // do nothing
        return false
    } else {
        currentSlideIndex ++;
        theChecker();
    }
}
// or
/*function nextSlider() {
    if (currentSlideIndex == slidesCount) {
        return false
    } else {
        currentSlideIndex ++;
        theChecker()
    }
}*/

// previous slide function
function prevSlider() {
    if (prevButton.classList.contains('disabled')) {
        // do nothing
        return false
    } else {
        currentSlideIndex --;
        theChecker();
    }
}
// or
/*function prevSlider() {
    if (currentSlideIndex == 1) {
        return false
    } else {
        currentSlideIndex --;
        theChecker()
    }
}*/

// create the checker function
function theChecker() {
    // set the slide number
    sliderNumberElement.textContent = "slide # " + (currentSlideIndex) + ' of ' + (slidesCount); // sliderImages.length
    
    // remove active class from imf and bullets
    removeAllActive();
    
    // set active class on current slide
    sliderImages[currentSlideIndex - 1].classList.add('active');
    // set active class on the current li or pagination item
    paginationCreatedUl.children[currentSlideIndex - 1].classList.add('active'); // or // document.querySelectorAll('li')[currentSlideIndex - 1].classList.add('active');;

    // check if the current slide is the first or the last
    if (currentSlideIndex == 1) {
        // add sisable class on the previous button
        prevButton.classList.add('disabled');
    } else {
        prevButton.classList.remove('disabled');
    }
    
    if (currentSlideIndex == slidesCount) { // sliderImages.length
        // add sisable class on the previous button
        nextButton.classList.add('disabled');
    } else {
        nextButton.classList.remove('disabled');
    }
    // or
    /* if (currentSlideIndex == 1) {
        prevButton.classList.add('disabled');
    } else if (currentSlideIndex == slidesCount) {
        nextButton.classList.add('disabled');        
    } else {
        prevButton.classList.remove('disabled');
        nextButton.classList.remove('disabled');
    } */

    localStorage.setItem('slideNum', currentSlideIndex);
}
/* كدا الفانكشن بتكتبلي السليدر الحالي رقمو كام و بتضيف للسليدر الحالي كلاس اكتيف و بتضيف للال اي الحالي كلاس اكتف بس لسا المفروض انك تعمل برضو جوا الفانكشن دي اول ما تضغط علي الزرار او الال اي او كدا يبدا يشيل كل الكلاسات الموضودة حاليا لانك لو معملتش كدا هيبدا يضيف كلاس اكتيف علي اللي علية الدور و بالتالي هيكون في 2 ال اي و اتنين صورة عليهم كلاس الاككتف دا و دا مش صح و كمان المفروض تبدا تشيك هل العنصر دا او الال اي دا هوا اخر واحد علشان لو اخر واحد او اول واحد تبدا تحط وية تنسيقال واللي هيا كلاس الديسبلاي علشان فية تنسيقات بتخلي الكارسر يتحول لاكس كدا علاشن مش يعرف يقلب لانو اخر حاجة او اول حاجة */

// remove active classfrom images and bullets
function removeAllActive() {
    sliderImages.forEach(function(img) {  // we can use arrow function
        img.classList.remove('active');
    });
    // or 
    // for (img of sliderImages) {
    //     img.classList.remove('active');
    // } 
    // or
    // Array.from(sliderImages,(img) => {img.classList.remove('active');})

    var paginationBullets = Array.from(document.querySelectorAll('#pagination-ul li'));
    paginationBullets.forEach((bullet) => {bullet.classList.remove('active')}); // we can use arrow function
    // or
    // document.querySelectorAll('#pagination-ul li').forEach(function(bullets) {
    //     bullets.classList.remove('active');
    // });
    // or
    // use for of loop  or use Array.from
    // Array.from(document.querySelectorAll('#pagination-ul li'), (bullet) => bullet.classList.remove('active'))
}
