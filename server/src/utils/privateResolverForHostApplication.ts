const privateResolverForHostApp = resolverFunction => async (
    parent,
    args,
    context,
    info
) => {
    if (!context.req.house) {
        throw new Error("Unauthorized House");
    }
    return await resolverFunction(parent, args, context, info);
};
export default privateResolverForHostApp;
