<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output type="html" />

    <xsl:template match="/">        
        <div id="reader">
        <xsl:apply-templates />
    </div>
    </xsl:template>

    <xsl:template match="backup">
        <h2><xsl:value-of select="@nick" /></h2>
        <div>yedek tarihi: <xsl:value-of select="@backupdate" /></div>        
    </xsl:template>

    <xsl:template match="entry">
        <div class="entry"></div>
    </xsl:template>
</xsl:stylesheet>