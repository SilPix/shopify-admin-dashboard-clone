//Profile Dropdown
let profileBtn = document.getElementById('profile-btn');
let profileMenu = document.getElementById('menu');
const allMenuItems = profileMenu.querySelectorAll('[role="menuitem"]');

let notifBtn = document.getElementById('notification');
let notifMenu = document.getElementById('notif-menu');
const allNotifMenuItems = notifMenu.querySelectorAll('[role="menuitem"]');

if(profileBtn.ariaExpanded == "true"){
    allMenuItems.item(0).focus();
}

function toggleMenu(){
    if(profileMenu.hasAttribute('hidden') == true){
        profileMenu.removeAttribute('hidden');
        profileBtn.setAttribute('aria-expanded', true);
        
        allMenuItems.item(0).focus();
    }else{
        profileMenu.setAttribute('hidden', true);
        profileBtn.setAttribute('aria-expanded', false);
        
        profileBtn.focus();
    }   
}

function toggleNotifications(){
    if(notifMenu.hasAttribute('hidden') == true){
        notifMenu.removeAttribute('hidden');
        notifBtn.setAttribute('aria-expanded', true);
    }else{
        notifMenu.setAttribute('hidden', true);
        notifBtn.setAttribute('aria-expanded', false);
        
        notifBtn.focus();
    }   
}

let guideBtn = document.getElementById('guideBtn');
let guideMenu = document.getElementById('guide');
let upArr = guideBtn.querySelector('.up');
let downArr = guideBtn.querySelector('.down');

function toggleGuide(){
    if(guideMenu.hasAttribute('hidden') == true){
        guideMenu.removeAttribute('hidden');
        guideBtn.setAttribute('aria-expanded', true);
        
        upArr.classList.add("hidden");
        downArr.classList.remove("hidden");
    }else{
        guideMenu.setAttribute('hidden', true);
        guideBtn.setAttribute('aria-expanded', false);
        
        downArr.classList.add("hidden");
        upArr.classList.remove("hidden");
        
        guideBtn.focus();
    }
}

function dismissAd(){
    const ad = document.getElementById('main').querySelector('.ad');
    console.log(ad);
    ad.classList.add("hidden");
}

//Accordion
const tabs = document.querySelectorAll('[role="tab"]');
const tabList = document.querySelector('[role="tablist"]');
let tabCounter = 0;

tabs.forEach((tab) => {tab.addEventListener("click", switchTabs);});

tabList.addEventListener("keydown", (ev) => {
    if(ev.key === "ArrowUp" || ev.key === "ArrowDown"){
        tabs[tabCounter].setAttribute("tabindex", -1);
        
        if(ev.key === "ArrowDown"){
            tabCounter++;
            if(tabCounter >= tabs.length){tabCounter = 0;}
        }
        
        if(ev.key === "ArrowUp"){
            tabCounter--;
            if(tabCounter < 0){tabCounter = tabs.length - 1;}
        }
        
        tabs[tabCounter].setAttribute("tabindex", 0);
        tabs[tabCounter].focus();
    }
});

function switchTabs(ev){
    const target = ev.target;
    const parent = target.parentNode.parentNode;
    const grandparent = parent.parentNode;
    
    console.log(target);
    console.log(parent);
    console.log(grandparent);
    
    //Unselect all tabs
    parent.querySelectorAll('[aria-selected="true"]')
        .forEach((tb) => {
        tb.setAttribute("aria-selected", false);
    });
    
    //Select 'this' tab
    target.setAttribute("aria-selected", true);
    target.removeAttribute("hidden");
    
    //Hide all Tab-panels
    grandparent.querySelectorAll('[role="tabpanel"]')
        .forEach((div) => div.setAttribute("hidden", true));
    
    //Show selected panel
    grandparent.parentNode.querySelector(`#${target.getAttribute("aria-controls")}`)
        .removeAttribute("hidden");
    
    //Visual Cues
    grandparent.querySelectorAll('.tab-selected')
        .forEach((div) => div.classList.remove("tab-selected"));
    grandparent.querySelectorAll('[role="tabpanel"]')
        .forEach((div) => div.classList.remove("tab-selected"));
    
    parent.classList.add("tab-selected");
    grandparent.parentNode.querySelector(`#${target.getAttribute("aria-controls")}`)
        .classList.add("tab-selected");
}

//Checkboxes
const checkBtn = document.getElementById('checkcircle');
const notChecked = checkBtn.querySelector('#notdone');
const checked = checkBtn.querySelector('#done');
const loadingCheck = checkBtn.querySelector('#loading-check');

console.log({checkBtn, notChecked, checked, loadingCheck});

checkBtn.addEventListener("click", checkDoneOrNot);

function handleDone(){
    notChecked.classList.add("hidden");
    loadingCheck.classList.remove("hidden");
    
    setTimeout(() => {
        loadingCheck.classList.add("hidden");
        checked.classList.remove("hidden");
        
        checkBtn.ariaLabel = checkBtn.ariaLabel.replace("as done", "as not done");
        checkBtn.classList.add('checkdone');
    }, 3000);
}

function handleNotDone(){
    checked.classList.add("hidden");
    loadingCheck.classList.remove("hidden");
    
    setTimeout(() => {
        loadingCheck.classList.add("hidden");
        notChecked.classList.remove("hidden");
    }, 3000);
}

function checkDoneOrNot(){
    const isDone = checkBtn.classList.contains('checkdone');
    
    if(isDone){
        handleNotDone();
    }else{
        handleDone();
    }
}

/*
;(function () {
    $(document).ready(function(){
        var $button, $menu
        $button = $('button')
        $menu = $('#menu')
        
        return $button.click(()=> {
            if($menu.attr('hidden') === 'hidden'){
                $menu.removeAttr('hidden')
                return $button.attr('aria-expanded', true)
            }else{
                $menu.attr('hidden', true)
                return $button.attr('aria-expanded', false)
            }
        })
    })
}).call(this)
*/