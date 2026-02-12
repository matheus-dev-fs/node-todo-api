export const validateUpdateFields = (title?: string, done?: boolean): string | null => {
    const IS_TITLE_SENT: boolean = title !== undefined;
    const IS_TITLE_STRING: boolean = typeof title === 'string';
    const IS_TITLE_EMPTY: boolean = IS_TITLE_STRING && title!.trim() === '';
    
    if (IS_TITLE_SENT && (!IS_TITLE_STRING || IS_TITLE_EMPTY)) {
        return 'O campo "title" deve ser uma string não vazia.';
    }

    const IS_DONE_SENT: boolean = done !== undefined;
    const IS_DONE_BOOLEAN: boolean = typeof done === 'boolean';

    if (IS_DONE_SENT && !IS_DONE_BOOLEAN) {
        return 'O campo "done" deve ser um booleano.';
    }

    if (!IS_TITLE_SENT && !IS_DONE_SENT) {
        return 'Pelo menos um dos campos "title" ou "done" deve ser enviado.';
    }

    return null;
}