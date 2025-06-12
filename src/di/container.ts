import 'reflect-metadata'
import { container } from 'tsyringe'
import { StationRepository } from '../repositories/stationRepository'
import { StationService } from '../services/stationService'

container.register('StationRepository', { useClass: StationRepository })
container.register('StationService', { useClass: StationService })
