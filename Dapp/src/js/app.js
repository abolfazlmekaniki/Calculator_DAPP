web3Provider = null;
contracts = {};
url = "http://127.0.0.1:7545";
currentAccount = null;
owner = null;
$(function(){
    $(window).load(function(){
        init();
        
    });
});

function init() {
    // راه اندازی اولیه پروژه
    return initWeb3();
}

async function initWeb3() {
    const provider = await detectEthereumProvider()
    if (!provider) {
        // handle no provider
        alert('Please install and login to Metamask!');
        return;
    }

    // اتصال به شبکه بلاکچین
    if(typeof web3 !== 'undefined') {
        // یک اتصال فعال به بلاکچین وجود دارد
        web3Provider = provider;
    } else {
        web3Provider = new Web3.providers.HttpProvider(url);
    }

    web3 = new Web3(web3Provider);

    ethereum.on('accountsChanged', handleAccountChanged);
    ethereum.on('chainChanged', handleChainChanged);

    // ست کردن اکانت پیش فرض
    handleAccountChanged();

    // پر کردن آدرس اکانت ها
    populateAddresses();

    return initContract();
}

function handleAccountChanged() {
    ethereum.request({method: 'eth_requestAccounts'}).then(function(accounts) {
        currentAccount = accounts[0];
        web3.eth.defaultAccount = currentAccount;
        setCurrentAccount();
        console.log('Account Changed: ', currentAccount);
    });
}

async function handleChainChanged() {
    // رفرش کردن صفحه
    window.location.reload();
}

function setCurrentAccount() {
    $('#current_account').text("Current Account: " + currentAccount);
}

function populateAddresses() {
    // اگر از وب3 موجود استفاده کنیم فقط اکانت کانکت شده به سایت را نشان خواهد داد
    web3 = new Web3(new Web3.providers.HttpProvider(url));
    web3.eth.getAccounts(function(err, accounts){
        //console.log(accounts);
        jQuery.each(accounts, function(idx){
            //console.log(accounts[idx]);
            var tag = '<option value="' + accounts[idx] + '">' + accounts[idx] + '</option>';

            $('#enter_address').append(tag);
            $('#enter_buy_address').append(tag);
        });
    });
}


function initContract() {
    $.getJSON('Calculator.json', function(artifact){
        var lottoryArtifact = artifact;
        contracts.Calculator = TruffleContract(lottoryArtifact);
        contracts.Calculator.setProvider(web3Provider);
    }).then(function(){
        setCurrentAccount();
    });
    
    return bindEvents();
}



function bindEvents() {
    $(document).on('click', '#plus', _plus);
    $(document).on('click', '#minus', _minus);
    $(document).on('click', '#multi', _multi);
    $(document).on('click', '#divide', _divide);

}


function _plus() {
    // console.log("result is :");
    var lottoryInstance;
    contracts.Calculator.deployed().then(function(instance){
        lottoryInstance = instance;
        var num1 = $('#number1').val();
        var num2 = $('#number2').val();
        return lottoryInstance.add_(num1,num2);
    }).then(function(result){
        console.log("result is :", result);
        $('#plusresult').text( result);
    });
}

function _minus() {
    // console.log("result is :");
    var lottoryInstance;
    contracts.Calculator.deployed().then(function(instance){
        lottoryInstance = instance;
        var num1 = $('#number11').val();
        var num2 = $('#number12').val();
        return lottoryInstance.minus_(num1,num2);
    }).then(function(result){
        console.log("result is :", result);
        $('#minusresult').text( result);
    });
}

function _multi() {
    // console.log("result is :");
    var lottoryInstance;
    contracts.Calculator.deployed().then(function(instance){
        lottoryInstance = instance;
        var num1 = $('#number21').val();
        var num2 = $('#number22').val();
        return lottoryInstance.multy_(num1,num2);
    }).then(function(result){
        console.log("result is :", result);
        $('#multiresult').text( result);
    });
}

function _divide() {
    // console.log("result is :");
    var lottoryInstance;
    contracts.Calculator.deployed().then(function(instance){
        lottoryInstance = instance;
        var num1 = $('#number31').val();
        var num2 = $('#number32').val();
        return lottoryInstance.divide_(num1,num2);
    }).then(function(result){
        console.log("result is :", result);
        $('#divideresult').text( result);
    });
}


