function convertSectionToDuration(totalSections) {
    const hours = Math.floor(totalSections / 3600)
    const minutes = Math.floor((totalSections % 3600) / 60)
    const seconds = Math.floor((totalSections % 3600) / 60)

    if (hours > 0)
        return `${hours}h ${minutes}m`

    else if (minutes > 0)
        return `${hours}h ${minutes}m`

    else
        return `${hours}h ${minutes}m`
}

module.exports = { convertSectionToDuration }