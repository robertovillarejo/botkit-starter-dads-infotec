export interface BotConfigurer {
    configureMiddlewares(): void;
    configureSkills(): void;
}