function switch_content(id){
    var option = ['Login_content','Register_content','Game_content','Welcome_content'];
    option.forEach(element => {
        if(id === element){
            document.getElementById(element).style.display = 'block';
        }
        else{
            document.getElementById(element).style.display = 'none';
        }
    });
}