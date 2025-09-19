export async function updateFinancialProfileController(req,res,next) {
    try {
        const id = req.id;
        const profile = finFinancialProfileById(id) //requires creation and implementation.
        const updated = updateFinancialProfileFields(profile,req.body);
        await saveFinancialProfile(updated);//create and implement
        res.json({success:true, updated});
    } catch (error) {
        next(error);
    }
}