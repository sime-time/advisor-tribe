import { getAdvisorPlans, getPlanFeatures, getPlanPricing } from '~/db/queries/get-plans'

export default defineEventHandler(async (event) => {
  try {
    const plans = await getAdvisorPlans(1)
    const features = await getPlanFeatures(1)
    const pricing = await getPlanPricing(1)

    return {
      success: true,
      data: {
        plans,
        features,
        pricing
      }
    }
  } catch (error) {
    console.error('Error:', error)
    throw createError({
      statusCode: 500,
      message: String(error)
    })
  }
})
