
function getDomain(domain: any){
  return domain.config.domain
}

export const DOMAIN = getDomain(window)
