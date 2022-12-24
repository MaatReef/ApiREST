// De esta manera el _homeservice lo declaramos de tipo privado.
let _homeService = null;

class HomeController {
    constructor({ HomeService }){
        _homeService = HomeService; 
    }

    index(req, res){
        return res.send(_homeService.index());
    }
}

module.exports = HomeController;