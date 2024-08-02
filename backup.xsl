<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output type="html" />

    <xsl:template match="/">
        <div id="reader">
            <xsl:apply-templates />
        </div>
    </xsl:template>

    <xsl:template match="backup">
        <h2 class="backup-owner">
            <xsl:value-of select="@nick" />
        </h2>
        <div>yedek tarihi: <xsl:value-of select="@backupdate" /></div>

        <hr/>

        <xsl:apply-templates />
    </xsl:template>

    <xsl:template match="entry">
        <div class="entry">
            <h3>
                <a>
                    <xsl:attribute name="href">https://eksisozluk.com/?q=<xsl:value-of
                            select="@title" /></xsl:attribute>
                    <xsl:value-of select="@title" />
                </a>
            </h3>
            <div class="entry">
                <pre><xsl:value-of select="."/></pre>
            </div>
            <div class="aul">
                <a>
                    <xsl:attribute name="href">https://eksisozluk.com/?q=@<xsl:value-of
                            select="@title" /></xsl:attribute>                    
                    <xsl:value-of select="/backup/@nick" /></a>
                <br />
                <xsl:value-of select="@date" />
            </div>
        </div>
    </xsl:template>

    <xsl:template match="drafts">
        <h2>kenarda duranlar (<xsl:value-of select="@count" />)</h2>

        <xsl:apply-templates />
    </xsl:template>

    <xsl:template match="draft">
        <div class="entry">
            <h3>
                <a>
                    <xsl:value-of select="@title" />
                </a>
            </h3>
            <div class="entry draft">
                <pre><xsl:value-of select="."/></pre>
            </div>
            <div class="aul">
                <a>
                    <xsl:attribute name="href">https://eksisozluk.com/?q=@<xsl:value-of
                            select="@title" /></xsl:attribute>                    
                    <xsl:value-of select="/backup/@nick" /></a>
                <br />
                <xsl:value-of select="@date" />
            </div>
        </div>
    </xsl:template>
</xsl:stylesheet>