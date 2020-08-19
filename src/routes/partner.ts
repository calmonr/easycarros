import { Router } from 'express'
import { Container } from 'typedi'
import { classToPlain } from 'class-transformer'

import { PartnerService } from '../modules/partner/partner.service'

const router = Router()

router.post('/by-service', async ({ body: { service, coodinates } }, res) => {
  const partnerService = Container.get(PartnerService)

  // in meters: 10km
  const distance = 10000

  const partner = await partnerService.findByService(
    service,
    coodinates,
    distance
  )

  return res.json({
    closest: classToPlain(partner) || {}
  })
})

router.post('/by-address', async ({ body: { address } }, res) => {
  const partnerService = Container.get(PartnerService)

  // in meters: 10km
  const distance = 10000

  const partners = await partnerService.findByAddress(address, distance)

  return res.json({
    partners: classToPlain(partners) || {}
  })
})

export default router
