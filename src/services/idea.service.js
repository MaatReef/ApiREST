const BaseService = require('./base.service');
let _ideaRepository = null;

class IdeaService extends BaseService {
    constructor({IdeaRepository}){
        super(IdeaRepository);
        _ideaRepository = IdeaRepository;
    }

    async getUserIdeas(author){
        if (!author){
            const error = new Error();
            error.status = 400;
            error.message = "UserId must be sent";
            throw error;
        }

        return await _ideaRepository.getUserIdeas(author);
    }

    async upvoteIdea(ideaId){
        // Para evitar repetir código se podría crear crear una carpeta con los errores correspondientes.
        if (!author){
            const error = new Error();
            error.status = 400;
            error.message = "UserId must be sent";
            throw error;
        }

        const idea = await _ideaRepository.get(ideaId);
        if(!idea){
            const error = new Error();
            error.status = 404;
            error.message = "Idea does not exist";
            throw error;
        }

        // Traemos todos los votos de la idea, agregando uno adicional
        idea.upvotes.push(true);

        // Actualizamos los votos con sus ideas.
        return await _ideaRepository.update(ideaId, {upvotes: idea.upvotes});
    }

    async downIdea(ideaId){
        // Para evitar repetir código se podría crear crear una carpeta con los errores correspondientes.
        if (!author){
            const error = new Error();
            error.status = 400;
            error.message = "UserId must be sent";
            throw error;
        }

        const idea = await _ideaRepository.get(ideaId);
        if(!idea){
            const error = new Error();
            error.status = 404;
            error.message = "Idea does not exist";
            throw error;
        }

        // Traemos todos los votos de la idea, agregando uno adicional
        idea.downIdea.push(true);

        // Actualizamos los votos con sus ideas.
        return await _ideaRepository.update(ideaId, {downvotes: idea.downvotes});
    }
}

module.exports = IdeaService;