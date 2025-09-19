export async function updateFinancialProfileController(req,res,next) {
    try {
        const id = req.userId;
        const profile = finFinancialProfileByuserId(id) //requires creation and implementation.
        const updated = updateFinancialProfileFields(profile,req.body);
        await saveFinancialProfile(updated);//create and implement
        res.json({success:true, updated});
    } catch (error) {
        next(error);
    }
}