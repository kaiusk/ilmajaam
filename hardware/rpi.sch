<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE eagle SYSTEM "eagle.dtd">
<eagle version="7.1.1">
<drawing>
<settings>
<setting alwaysvectorfont="no"/>
<setting verticaltext="up"/>
</settings>
<grid distance="0.1" unitdist="inch" unit="inch" style="lines" multiple="1" display="no" altdistance="0.01" altunitdist="inch" altunit="inch"/>
<layers>
<layer number="1" name="Top" color="4" fill="1" visible="no" active="no"/>
<layer number="16" name="Bottom" color="1" fill="1" visible="no" active="no"/>
<layer number="17" name="Pads" color="2" fill="1" visible="no" active="no"/>
<layer number="18" name="Vias" color="2" fill="1" visible="no" active="no"/>
<layer number="19" name="Unrouted" color="6" fill="1" visible="no" active="no"/>
<layer number="20" name="Dimension" color="15" fill="1" visible="no" active="no"/>
<layer number="21" name="tPlace" color="7" fill="1" visible="no" active="no"/>
<layer number="22" name="bPlace" color="7" fill="1" visible="no" active="no"/>
<layer number="23" name="tOrigins" color="15" fill="1" visible="no" active="no"/>
<layer number="24" name="bOrigins" color="15" fill="1" visible="no" active="no"/>
<layer number="25" name="tNames" color="7" fill="1" visible="no" active="no"/>
<layer number="26" name="bNames" color="7" fill="1" visible="no" active="no"/>
<layer number="27" name="tValues" color="7" fill="1" visible="no" active="no"/>
<layer number="28" name="bValues" color="7" fill="1" visible="no" active="no"/>
<layer number="29" name="tStop" color="7" fill="3" visible="no" active="no"/>
<layer number="30" name="bStop" color="7" fill="6" visible="no" active="no"/>
<layer number="31" name="tCream" color="7" fill="4" visible="no" active="no"/>
<layer number="32" name="bCream" color="7" fill="5" visible="no" active="no"/>
<layer number="33" name="tFinish" color="6" fill="3" visible="no" active="no"/>
<layer number="34" name="bFinish" color="6" fill="6" visible="no" active="no"/>
<layer number="35" name="tGlue" color="7" fill="4" visible="no" active="no"/>
<layer number="36" name="bGlue" color="7" fill="5" visible="no" active="no"/>
<layer number="37" name="tTest" color="7" fill="1" visible="no" active="no"/>
<layer number="38" name="bTest" color="7" fill="1" visible="no" active="no"/>
<layer number="39" name="tKeepout" color="4" fill="11" visible="no" active="no"/>
<layer number="40" name="bKeepout" color="1" fill="11" visible="no" active="no"/>
<layer number="41" name="tRestrict" color="4" fill="10" visible="no" active="no"/>
<layer number="42" name="bRestrict" color="1" fill="10" visible="no" active="no"/>
<layer number="43" name="vRestrict" color="2" fill="10" visible="no" active="no"/>
<layer number="44" name="Drills" color="7" fill="1" visible="no" active="no"/>
<layer number="45" name="Holes" color="7" fill="1" visible="no" active="no"/>
<layer number="46" name="Milling" color="3" fill="1" visible="no" active="no"/>
<layer number="47" name="Measures" color="7" fill="1" visible="no" active="no"/>
<layer number="48" name="Document" color="7" fill="1" visible="no" active="no"/>
<layer number="49" name="Reference" color="7" fill="1" visible="no" active="no"/>
<layer number="51" name="tDocu" color="7" fill="1" visible="no" active="no"/>
<layer number="52" name="bDocu" color="7" fill="1" visible="no" active="no"/>
<layer number="90" name="Modules" color="5" fill="1" visible="yes" active="yes"/>
<layer number="91" name="Nets" color="2" fill="1" visible="yes" active="yes"/>
<layer number="92" name="Busses" color="1" fill="1" visible="yes" active="yes"/>
<layer number="93" name="Pins" color="2" fill="1" visible="no" active="yes"/>
<layer number="94" name="Symbols" color="4" fill="1" visible="yes" active="yes"/>
<layer number="95" name="Names" color="7" fill="1" visible="yes" active="yes"/>
<layer number="96" name="Values" color="7" fill="1" visible="yes" active="yes"/>
<layer number="97" name="Info" color="7" fill="1" visible="yes" active="yes"/>
<layer number="98" name="Guide" color="6" fill="1" visible="yes" active="yes"/>
</layers>
<schematic xreflabel="%F%N/%S.%C%R" xrefpart="/%S.%C%R">
<libraries>
<library name="con-lsta">
<description>&lt;b&gt;Female Headers etc.&lt;/b&gt;&lt;p&gt;
Naming:&lt;p&gt;
FE = female&lt;p&gt;
# contacts - # rows&lt;p&gt;
W = angled&lt;p&gt;
&lt;author&gt;Created by librarian@cadsoft.de&lt;/author&gt;</description>
<packages>
<package name="FE13-2">
<description>&lt;b&gt;FEMALE HEADER&lt;/b&gt;</description>
<wire x1="-16.51" y1="-2.413" x2="-16.51" y2="2.413" width="0.1524" layer="21"/>
<wire x1="-16.51" y1="2.413" x2="-15.875" y2="3.048" width="0.1524" layer="21" curve="-90"/>
<wire x1="-16.51" y1="-2.413" x2="-15.875" y2="-3.048" width="0.1524" layer="21" curve="90"/>
<wire x1="-15.875" y1="3.048" x2="15.875" y2="3.048" width="0.1524" layer="21"/>
<wire x1="16.51" y1="-2.413" x2="16.51" y2="2.413" width="0.1524" layer="21"/>
<wire x1="-15.875" y1="-3.048" x2="15.875" y2="-3.048" width="0.1524" layer="21"/>
<wire x1="15.875" y1="3.048" x2="16.51" y2="2.413" width="0.1524" layer="21" curve="-90"/>
<wire x1="15.875" y1="-3.048" x2="16.51" y2="-2.413" width="0.1524" layer="21" curve="90"/>
<circle x="-15.24" y="-1.27" radius="0.127" width="0.4064" layer="51"/>
<circle x="-15.24" y="1.27" radius="0.127" width="0.4064" layer="51"/>
<circle x="-12.7" y="-1.27" radius="0.127" width="0.4064" layer="51"/>
<circle x="-12.7" y="1.27" radius="0.127" width="0.4064" layer="51"/>
<circle x="-10.16" y="-1.27" radius="0.127" width="0.4064" layer="51"/>
<circle x="-10.16" y="1.27" radius="0.127" width="0.4064" layer="51"/>
<circle x="-7.62" y="-1.27" radius="0.127" width="0.4064" layer="51"/>
<circle x="-7.62" y="1.27" radius="0.127" width="0.4064" layer="51"/>
<circle x="-5.08" y="-1.27" radius="0.127" width="0.4064" layer="51"/>
<circle x="-5.08" y="1.27" radius="0.127" width="0.4064" layer="51"/>
<circle x="-15.24" y="-1.27" radius="0.889" width="0.1524" layer="51"/>
<circle x="-15.24" y="1.27" radius="0.889" width="0.1524" layer="51"/>
<circle x="-12.7" y="1.27" radius="0.889" width="0.1524" layer="51"/>
<circle x="-10.16" y="1.27" radius="0.889" width="0.1524" layer="51"/>
<circle x="-7.62" y="1.27" radius="0.889" width="0.1524" layer="51"/>
<circle x="-5.08" y="1.27" radius="0.889" width="0.1524" layer="51"/>
<circle x="-12.7" y="-1.27" radius="0.889" width="0.1524" layer="51"/>
<circle x="-10.16" y="-1.27" radius="0.889" width="0.1524" layer="51"/>
<circle x="-7.62" y="-1.27" radius="0.889" width="0.1524" layer="51"/>
<circle x="-5.08" y="-1.27" radius="0.889" width="0.1524" layer="51"/>
<circle x="-2.54" y="-1.27" radius="0.127" width="0.4064" layer="51"/>
<circle x="-2.54" y="1.27" radius="0.127" width="0.4064" layer="51"/>
<circle x="0" y="-1.27" radius="0.127" width="0.4064" layer="51"/>
<circle x="0" y="1.27" radius="0.127" width="0.4064" layer="51"/>
<circle x="2.54" y="-1.27" radius="0.127" width="0.4064" layer="51"/>
<circle x="2.54" y="1.27" radius="0.127" width="0.4064" layer="51"/>
<circle x="5.08" y="-1.27" radius="0.127" width="0.4064" layer="51"/>
<circle x="5.08" y="1.27" radius="0.127" width="0.4064" layer="51"/>
<circle x="7.62" y="-1.27" radius="0.127" width="0.4064" layer="51"/>
<circle x="7.62" y="1.27" radius="0.127" width="0.4064" layer="51"/>
<circle x="-2.54" y="-1.27" radius="0.889" width="0.1524" layer="51"/>
<circle x="-2.54" y="1.27" radius="0.889" width="0.1524" layer="51"/>
<circle x="0" y="1.27" radius="0.889" width="0.1524" layer="51"/>
<circle x="2.54" y="1.27" radius="0.889" width="0.1524" layer="51"/>
<circle x="5.08" y="1.27" radius="0.889" width="0.1524" layer="51"/>
<circle x="7.62" y="1.27" radius="0.889" width="0.1524" layer="51"/>
<circle x="0" y="-1.27" radius="0.889" width="0.1524" layer="51"/>
<circle x="2.54" y="-1.27" radius="0.889" width="0.1524" layer="51"/>
<circle x="5.08" y="-1.27" radius="0.889" width="0.1524" layer="51"/>
<circle x="7.62" y="-1.27" radius="0.889" width="0.1524" layer="51"/>
<circle x="10.16" y="-1.27" radius="0.127" width="0.4064" layer="51"/>
<circle x="10.16" y="1.27" radius="0.127" width="0.4064" layer="51"/>
<circle x="12.7" y="-1.27" radius="0.127" width="0.4064" layer="51"/>
<circle x="12.7" y="1.27" radius="0.127" width="0.4064" layer="51"/>
<circle x="15.24" y="-1.27" radius="0.127" width="0.4064" layer="51"/>
<circle x="15.24" y="1.27" radius="0.127" width="0.4064" layer="51"/>
<circle x="10.16" y="-1.27" radius="0.889" width="0.1524" layer="51"/>
<circle x="10.16" y="1.27" radius="0.889" width="0.1524" layer="51"/>
<circle x="12.7" y="1.27" radius="0.889" width="0.1524" layer="51"/>
<circle x="15.24" y="1.27" radius="0.889" width="0.1524" layer="51"/>
<circle x="12.7" y="-1.27" radius="0.889" width="0.1524" layer="51"/>
<circle x="15.24" y="-1.27" radius="0.889" width="0.1524" layer="51"/>
<pad name="1" x="-15.24" y="1.27" drill="0.9144"/>
<pad name="2" x="-15.24" y="-1.27" drill="0.9144" shape="octagon"/>
<pad name="3" x="-12.7" y="1.27" drill="0.9144" shape="octagon"/>
<pad name="4" x="-12.7" y="-1.27" drill="0.9144" shape="octagon"/>
<pad name="5" x="-10.16" y="1.27" drill="0.9144" shape="octagon"/>
<pad name="6" x="-10.16" y="-1.27" drill="0.9144" shape="octagon"/>
<pad name="7" x="-7.62" y="1.27" drill="0.9144" shape="octagon"/>
<pad name="8" x="-7.62" y="-1.27" drill="0.9144" shape="octagon"/>
<pad name="9" x="-5.08" y="1.27" drill="0.9144" shape="octagon"/>
<pad name="10" x="-5.08" y="-1.27" drill="0.9144" shape="octagon"/>
<pad name="11" x="-2.54" y="1.27" drill="0.9144" shape="octagon"/>
<pad name="12" x="-2.54" y="-1.27" drill="0.9144" shape="octagon"/>
<pad name="13" x="0" y="1.27" drill="0.9144" shape="octagon"/>
<pad name="14" x="0" y="-1.27" drill="0.9144" shape="octagon"/>
<pad name="15" x="2.54" y="1.27" drill="0.9144" shape="octagon"/>
<pad name="16" x="2.54" y="-1.27" drill="0.9144" shape="octagon"/>
<pad name="17" x="5.08" y="1.27" drill="0.9144" shape="octagon"/>
<pad name="18" x="5.08" y="-1.27" drill="0.9144" shape="octagon"/>
<pad name="19" x="7.62" y="1.27" drill="0.9144" shape="octagon"/>
<pad name="20" x="7.62" y="-1.27" drill="0.9144" shape="octagon"/>
<pad name="21" x="10.16" y="1.27" drill="0.9144" shape="octagon"/>
<pad name="22" x="10.16" y="-1.27" drill="0.9144" shape="octagon"/>
<pad name="23" x="12.7" y="1.27" drill="0.9144" shape="octagon"/>
<pad name="24" x="12.7" y="-1.27" drill="0.9144" shape="octagon"/>
<pad name="25" x="15.24" y="1.27" drill="0.9144" shape="octagon"/>
<pad name="26" x="15.24" y="-1.27" drill="0.9144" shape="octagon"/>
<text x="-10.16" y="3.429" size="1.27" layer="25" ratio="10">&gt;NAME</text>
<text x="-15.621" y="3.429" size="1.27" layer="21" ratio="10">1</text>
<text x="14.351" y="-4.699" size="1.27" layer="21" ratio="10">26</text>
<text x="-16.51" y="-4.699" size="1.27" layer="27" ratio="10">&gt;VALUE</text>
</package>
</packages>
<symbols>
<symbol name="FE13-2">
<wire x1="3.81" y1="-17.78" x2="-3.81" y2="-17.78" width="0.4064" layer="94"/>
<wire x1="-1.905" y1="-10.795" x2="-1.905" y2="-9.525" width="0.254" layer="94" curve="-180" cap="flat"/>
<wire x1="-1.905" y1="-13.335" x2="-1.905" y2="-12.065" width="0.254" layer="94" curve="-180" cap="flat"/>
<wire x1="-1.905" y1="-15.875" x2="-1.905" y2="-14.605" width="0.254" layer="94" curve="-180" cap="flat"/>
<wire x1="1.905" y1="-9.525" x2="1.905" y2="-10.795" width="0.254" layer="94" curve="-180" cap="flat"/>
<wire x1="1.905" y1="-12.065" x2="1.905" y2="-13.335" width="0.254" layer="94" curve="-180" cap="flat"/>
<wire x1="1.905" y1="-14.605" x2="1.905" y2="-15.875" width="0.254" layer="94" curve="-180" cap="flat"/>
<wire x1="-1.905" y1="-5.715" x2="-1.905" y2="-4.445" width="0.254" layer="94" curve="-180" cap="flat"/>
<wire x1="-1.905" y1="-8.255" x2="-1.905" y2="-6.985" width="0.254" layer="94" curve="-180" cap="flat"/>
<wire x1="1.905" y1="-4.445" x2="1.905" y2="-5.715" width="0.254" layer="94" curve="-180" cap="flat"/>
<wire x1="1.905" y1="-6.985" x2="1.905" y2="-8.255" width="0.254" layer="94" curve="-180" cap="flat"/>
<wire x1="-1.905" y1="1.905" x2="-1.905" y2="3.175" width="0.254" layer="94" curve="-180" cap="flat"/>
<wire x1="-1.905" y1="-0.635" x2="-1.905" y2="0.635" width="0.254" layer="94" curve="-180" cap="flat"/>
<wire x1="-1.905" y1="-3.175" x2="-1.905" y2="-1.905" width="0.254" layer="94" curve="-180" cap="flat"/>
<wire x1="1.905" y1="3.175" x2="1.905" y2="1.905" width="0.254" layer="94" curve="-180" cap="flat"/>
<wire x1="1.905" y1="0.635" x2="1.905" y2="-0.635" width="0.254" layer="94" curve="-180" cap="flat"/>
<wire x1="1.905" y1="-1.905" x2="1.905" y2="-3.175" width="0.254" layer="94" curve="-180" cap="flat"/>
<wire x1="-1.905" y1="6.985" x2="-1.905" y2="8.255" width="0.254" layer="94" curve="-180" cap="flat"/>
<wire x1="-1.905" y1="4.445" x2="-1.905" y2="5.715" width="0.254" layer="94" curve="-180" cap="flat"/>
<wire x1="1.905" y1="8.255" x2="1.905" y2="6.985" width="0.254" layer="94" curve="-180" cap="flat"/>
<wire x1="1.905" y1="5.715" x2="1.905" y2="4.445" width="0.254" layer="94" curve="-180" cap="flat"/>
<wire x1="-1.905" y1="14.605" x2="-1.905" y2="15.875" width="0.254" layer="94" curve="-180" cap="flat"/>
<wire x1="-1.905" y1="12.065" x2="-1.905" y2="13.335" width="0.254" layer="94" curve="-180" cap="flat"/>
<wire x1="-1.905" y1="9.525" x2="-1.905" y2="10.795" width="0.254" layer="94" curve="-180" cap="flat"/>
<wire x1="1.905" y1="15.875" x2="1.905" y2="14.605" width="0.254" layer="94" curve="-180" cap="flat"/>
<wire x1="1.905" y1="13.335" x2="1.905" y2="12.065" width="0.254" layer="94" curve="-180" cap="flat"/>
<wire x1="1.905" y1="10.795" x2="1.905" y2="9.525" width="0.254" layer="94" curve="-180" cap="flat"/>
<wire x1="-3.81" y1="17.78" x2="-3.81" y2="-17.78" width="0.4064" layer="94"/>
<wire x1="3.81" y1="-17.78" x2="3.81" y2="17.78" width="0.4064" layer="94"/>
<wire x1="-3.81" y1="17.78" x2="3.81" y2="17.78" width="0.4064" layer="94"/>
<text x="-3.81" y="-20.32" size="1.778" layer="96">&gt;VALUE</text>
<text x="-3.81" y="18.542" size="1.778" layer="95">&gt;NAME</text>
<pin name="1" x="-7.62" y="-15.24" visible="pad" length="middle" direction="pas" swaplevel="1"/>
<pin name="3" x="-7.62" y="-12.7" visible="pad" length="middle" direction="pas" swaplevel="1"/>
<pin name="5" x="-7.62" y="-10.16" visible="pad" length="middle" direction="pas" swaplevel="1"/>
<pin name="2" x="7.62" y="-15.24" visible="pad" length="middle" direction="pas" swaplevel="1" rot="R180"/>
<pin name="4" x="7.62" y="-12.7" visible="pad" length="middle" direction="pas" swaplevel="1" rot="R180"/>
<pin name="6" x="7.62" y="-10.16" visible="pad" length="middle" direction="pas" swaplevel="1" rot="R180"/>
<pin name="7" x="-7.62" y="-7.62" visible="pad" length="middle" direction="pas" swaplevel="1"/>
<pin name="9" x="-7.62" y="-5.08" visible="pad" length="middle" direction="pas" swaplevel="1"/>
<pin name="8" x="7.62" y="-7.62" visible="pad" length="middle" direction="pas" swaplevel="1" rot="R180"/>
<pin name="10" x="7.62" y="-5.08" visible="pad" length="middle" direction="pas" swaplevel="1" rot="R180"/>
<pin name="11" x="-7.62" y="-2.54" visible="pad" length="middle" direction="pas" swaplevel="1"/>
<pin name="13" x="-7.62" y="0" visible="pad" length="middle" direction="pas" swaplevel="1"/>
<pin name="15" x="-7.62" y="2.54" visible="pad" length="middle" direction="pas" swaplevel="1"/>
<pin name="12" x="7.62" y="-2.54" visible="pad" length="middle" direction="pas" swaplevel="1" rot="R180"/>
<pin name="14" x="7.62" y="0" visible="pad" length="middle" direction="pas" swaplevel="1" rot="R180"/>
<pin name="16" x="7.62" y="2.54" visible="pad" length="middle" direction="pas" swaplevel="1" rot="R180"/>
<pin name="17" x="-7.62" y="5.08" visible="pad" length="middle" direction="pas" swaplevel="1"/>
<pin name="19" x="-7.62" y="7.62" visible="pad" length="middle" direction="pas" swaplevel="1"/>
<pin name="18" x="7.62" y="5.08" visible="pad" length="middle" direction="pas" swaplevel="1" rot="R180"/>
<pin name="20" x="7.62" y="7.62" visible="pad" length="middle" direction="pas" swaplevel="1" rot="R180"/>
<pin name="21" x="-7.62" y="10.16" visible="pad" length="middle" direction="pas" swaplevel="1"/>
<pin name="23" x="-7.62" y="12.7" visible="pad" length="middle" direction="pas" swaplevel="1"/>
<pin name="25" x="-7.62" y="15.24" visible="pad" length="middle" direction="pas" swaplevel="1"/>
<pin name="22" x="7.62" y="10.16" visible="pad" length="middle" direction="pas" swaplevel="1" rot="R180"/>
<pin name="24" x="7.62" y="12.7" visible="pad" length="middle" direction="pas" swaplevel="1" rot="R180"/>
<pin name="26" x="7.62" y="15.24" visible="pad" length="middle" direction="pas" swaplevel="1" rot="R180"/>
</symbol>
</symbols>
<devicesets>
<deviceset name="FE13-2" prefix="SV" uservalue="yes">
<description>&lt;b&gt;FEMALE HEADER&lt;/b&gt;</description>
<gates>
<gate name="G$1" symbol="FE13-2" x="0" y="0"/>
</gates>
<devices>
<device name="" package="FE13-2">
<connects>
<connect gate="G$1" pin="1" pad="1"/>
<connect gate="G$1" pin="10" pad="10"/>
<connect gate="G$1" pin="11" pad="11"/>
<connect gate="G$1" pin="12" pad="12"/>
<connect gate="G$1" pin="13" pad="13"/>
<connect gate="G$1" pin="14" pad="14"/>
<connect gate="G$1" pin="15" pad="15"/>
<connect gate="G$1" pin="16" pad="16"/>
<connect gate="G$1" pin="17" pad="17"/>
<connect gate="G$1" pin="18" pad="18"/>
<connect gate="G$1" pin="19" pad="19"/>
<connect gate="G$1" pin="2" pad="2"/>
<connect gate="G$1" pin="20" pad="20"/>
<connect gate="G$1" pin="21" pad="21"/>
<connect gate="G$1" pin="22" pad="22"/>
<connect gate="G$1" pin="23" pad="23"/>
<connect gate="G$1" pin="24" pad="24"/>
<connect gate="G$1" pin="25" pad="25"/>
<connect gate="G$1" pin="26" pad="26"/>
<connect gate="G$1" pin="3" pad="3"/>
<connect gate="G$1" pin="4" pad="4"/>
<connect gate="G$1" pin="5" pad="5"/>
<connect gate="G$1" pin="6" pad="6"/>
<connect gate="G$1" pin="7" pad="7"/>
<connect gate="G$1" pin="8" pad="8"/>
<connect gate="G$1" pin="9" pad="9"/>
</connects>
<technologies>
<technology name="">
<attribute name="MF" value="" constant="no"/>
<attribute name="MPN" value="" constant="no"/>
<attribute name="OC_FARNELL" value="unknown" constant="no"/>
<attribute name="OC_NEWARK" value="unknown" constant="no"/>
</technology>
</technologies>
</device>
</devices>
</deviceset>
</devicesets>
</library>
<library name="con-molex">
<description>&lt;b&gt;Molex Connectors&lt;/b&gt;&lt;p&gt;
&lt;author&gt;Created by librarian@cadsoft.de&lt;/author&gt;</description>
<packages>
<package name="22-23-2021">
<description>.100" (2.54mm) Center Headers - 2 Pin</description>
<wire x1="-2.54" y1="3.175" x2="2.54" y2="3.175" width="0.254" layer="21"/>
<wire x1="2.54" y1="3.175" x2="2.54" y2="1.27" width="0.254" layer="21"/>
<wire x1="2.54" y1="1.27" x2="2.54" y2="-3.175" width="0.254" layer="21"/>
<wire x1="2.54" y1="-3.175" x2="-2.54" y2="-3.175" width="0.254" layer="21"/>
<wire x1="-2.54" y1="-3.175" x2="-2.54" y2="1.27" width="0.254" layer="21"/>
<wire x1="-2.54" y1="1.27" x2="-2.54" y2="3.175" width="0.254" layer="21"/>
<wire x1="-2.54" y1="1.27" x2="2.54" y2="1.27" width="0.254" layer="21"/>
<pad name="1" x="-1.27" y="0" drill="1" shape="long" rot="R90"/>
<pad name="2" x="1.27" y="0" drill="1" shape="long" rot="R90"/>
<text x="-2.54" y="3.81" size="1.016" layer="25" ratio="10">&gt;NAME</text>
<text x="-2.54" y="-5.08" size="1.016" layer="27" ratio="10">&gt;VALUE</text>
</package>
</packages>
<symbols>
<symbol name="MV">
<wire x1="1.27" y1="0" x2="0" y2="0" width="0.6096" layer="94"/>
<text x="2.54" y="-0.762" size="1.524" layer="95">&gt;NAME</text>
<text x="-0.762" y="1.397" size="1.778" layer="96">&gt;VALUE</text>
<pin name="S" x="-2.54" y="0" visible="off" length="short" direction="pas"/>
</symbol>
<symbol name="M">
<wire x1="1.27" y1="0" x2="0" y2="0" width="0.6096" layer="94"/>
<text x="2.54" y="-0.762" size="1.524" layer="95">&gt;NAME</text>
<pin name="S" x="-2.54" y="0" visible="off" length="short" direction="pas"/>
</symbol>
</symbols>
<devicesets>
<deviceset name="22-23-2021" prefix="X">
<description>.100" (2.54mm) Center Header - 2 Pin</description>
<gates>
<gate name="-1" symbol="MV" x="0" y="0" addlevel="always" swaplevel="1"/>
<gate name="-2" symbol="M" x="0" y="-2.54" addlevel="always" swaplevel="1"/>
</gates>
<devices>
<device name="" package="22-23-2021">
<connects>
<connect gate="-1" pin="S" pad="1"/>
<connect gate="-2" pin="S" pad="2"/>
</connects>
<technologies>
<technology name="">
<attribute name="MF" value="MOLEX" constant="no"/>
<attribute name="MPN" value="22-23-2021" constant="no"/>
<attribute name="OC_FARNELL" value="1462926" constant="no"/>
<attribute name="OC_NEWARK" value="25C3832" constant="no"/>
</technology>
</technologies>
</device>
</devices>
</deviceset>
</devicesets>
</library>
<library name="con-lstb">
<description>&lt;b&gt;Pin Headers&lt;/b&gt;&lt;p&gt;
Naming:&lt;p&gt;
MA = male&lt;p&gt;
# contacts - # rows&lt;p&gt;
W = angled&lt;p&gt;
&lt;author&gt;Created by librarian@cadsoft.de&lt;/author&gt;</description>
<packages>
<package name="MA03-1">
<description>&lt;b&gt;PIN HEADER&lt;/b&gt;</description>
<wire x1="-3.175" y1="1.27" x2="-1.905" y2="1.27" width="0.1524" layer="21"/>
<wire x1="-1.905" y1="1.27" x2="-1.27" y2="0.635" width="0.1524" layer="21"/>
<wire x1="-1.27" y1="-0.635" x2="-1.905" y2="-1.27" width="0.1524" layer="21"/>
<wire x1="-1.27" y1="0.635" x2="-0.635" y2="1.27" width="0.1524" layer="21"/>
<wire x1="-0.635" y1="1.27" x2="0.635" y2="1.27" width="0.1524" layer="21"/>
<wire x1="0.635" y1="1.27" x2="1.27" y2="0.635" width="0.1524" layer="21"/>
<wire x1="1.27" y1="-0.635" x2="0.635" y2="-1.27" width="0.1524" layer="21"/>
<wire x1="0.635" y1="-1.27" x2="-0.635" y2="-1.27" width="0.1524" layer="21"/>
<wire x1="-0.635" y1="-1.27" x2="-1.27" y2="-0.635" width="0.1524" layer="21"/>
<wire x1="-3.81" y1="0.635" x2="-3.81" y2="-0.635" width="0.1524" layer="21"/>
<wire x1="-3.175" y1="1.27" x2="-3.81" y2="0.635" width="0.1524" layer="21"/>
<wire x1="-3.81" y1="-0.635" x2="-3.175" y2="-1.27" width="0.1524" layer="21"/>
<wire x1="-1.905" y1="-1.27" x2="-3.175" y2="-1.27" width="0.1524" layer="21"/>
<wire x1="1.27" y1="0.635" x2="1.905" y2="1.27" width="0.1524" layer="21"/>
<wire x1="1.905" y1="1.27" x2="3.175" y2="1.27" width="0.1524" layer="21"/>
<wire x1="3.175" y1="1.27" x2="3.81" y2="0.635" width="0.1524" layer="21"/>
<wire x1="3.81" y1="-0.635" x2="3.175" y2="-1.27" width="0.1524" layer="21"/>
<wire x1="3.175" y1="-1.27" x2="1.905" y2="-1.27" width="0.1524" layer="21"/>
<wire x1="1.905" y1="-1.27" x2="1.27" y2="-0.635" width="0.1524" layer="21"/>
<wire x1="3.81" y1="0.635" x2="3.81" y2="-0.635" width="0.1524" layer="21"/>
<pad name="1" x="-2.54" y="0" drill="1.016" shape="long" rot="R90"/>
<pad name="2" x="0" y="0" drill="1.016" shape="long" rot="R90"/>
<pad name="3" x="2.54" y="0" drill="1.016" shape="long" rot="R90"/>
<text x="-3.81" y="1.651" size="1.27" layer="25" ratio="10">&gt;NAME</text>
<text x="-5.08" y="-0.635" size="1.27" layer="21" ratio="10">1</text>
<text x="-3.81" y="-2.921" size="1.27" layer="27" ratio="10">&gt;VALUE</text>
<rectangle x1="-0.254" y1="-0.254" x2="0.254" y2="0.254" layer="51"/>
<rectangle x1="-2.794" y1="-0.254" x2="-2.286" y2="0.254" layer="51"/>
<rectangle x1="2.286" y1="-0.254" x2="2.794" y2="0.254" layer="51"/>
</package>
</packages>
<symbols>
<symbol name="MA03-1">
<wire x1="3.81" y1="-5.08" x2="-1.27" y2="-5.08" width="0.4064" layer="94"/>
<wire x1="1.27" y1="2.54" x2="2.54" y2="2.54" width="0.6096" layer="94"/>
<wire x1="1.27" y1="0" x2="2.54" y2="0" width="0.6096" layer="94"/>
<wire x1="1.27" y1="-2.54" x2="2.54" y2="-2.54" width="0.6096" layer="94"/>
<wire x1="-1.27" y1="5.08" x2="-1.27" y2="-5.08" width="0.4064" layer="94"/>
<wire x1="3.81" y1="-5.08" x2="3.81" y2="5.08" width="0.4064" layer="94"/>
<wire x1="-1.27" y1="5.08" x2="3.81" y2="5.08" width="0.4064" layer="94"/>
<text x="-1.27" y="-7.62" size="1.778" layer="96">&gt;VALUE</text>
<text x="-1.27" y="5.842" size="1.778" layer="95">&gt;NAME</text>
<pin name="1" x="7.62" y="-2.54" visible="pad" length="middle" direction="pas" swaplevel="1" rot="R180"/>
<pin name="2" x="7.62" y="0" visible="pad" length="middle" direction="pas" swaplevel="1" rot="R180"/>
<pin name="3" x="7.62" y="2.54" visible="pad" length="middle" direction="pas" swaplevel="1" rot="R180"/>
</symbol>
</symbols>
<devicesets>
<deviceset name="MA03-1" prefix="SV" uservalue="yes">
<description>&lt;b&gt;PIN HEADER&lt;/b&gt;</description>
<gates>
<gate name="G$1" symbol="MA03-1" x="0" y="0"/>
</gates>
<devices>
<device name="" package="MA03-1">
<connects>
<connect gate="G$1" pin="1" pad="1"/>
<connect gate="G$1" pin="2" pad="2"/>
<connect gate="G$1" pin="3" pad="3"/>
</connects>
<technologies>
<technology name="">
<attribute name="MF" value="" constant="no"/>
<attribute name="MPN" value="" constant="no"/>
<attribute name="OC_FARNELL" value="unknown" constant="no"/>
<attribute name="OC_NEWARK" value="unknown" constant="no"/>
</technology>
</technologies>
</device>
</devices>
</deviceset>
</devicesets>
</library>
</libraries>
<attributes>
</attributes>
<variantdefs>
</variantdefs>
<classes>
<class number="0" name="default" width="0" drill="0">
</class>
</classes>
<parts>
<part name="GPIO" library="con-lsta" deviceset="FE13-2" device=""/>
<part name="5V" library="con-molex" deviceset="22-23-2021" device="" value=""/>
<part name="SW" library="con-molex" deviceset="22-23-2021" device="" value=""/>
<part name="PIR" library="con-lstb" deviceset="MA03-1" device=""/>
<part name="TEMP" library="con-lstb" deviceset="MA03-1" device=""/>
</parts>
<sheets>
<sheet>
<plain>
</plain>
<instances>
<instance part="GPIO" gate="G$1" x="45.72" y="53.34"/>
<instance part="5V" gate="-1" x="71.12" y="78.74"/>
<instance part="5V" gate="-2" x="71.12" y="76.2"/>
<instance part="SW" gate="-1" x="71.12" y="71.12"/>
<instance part="SW" gate="-2" x="71.12" y="68.58"/>
<instance part="PIR" gate="G$1" x="76.2" y="43.18" rot="R180"/>
<instance part="TEMP" gate="G$1" x="76.2" y="58.42" rot="R180"/>
</instances>
<busses>
<bus name="B$1">
<segment>
<wire x1="27.94" y1="35.56" x2="27.94" y2="78.74" width="0.762" layer="92"/>
<wire x1="27.94" y1="78.74" x2="60.96" y2="78.74" width="0.762" layer="92"/>
<wire x1="60.96" y1="78.74" x2="60.96" y2="35.56" width="0.762" layer="92"/>
</segment>
</bus>
</busses>
<nets>
<net name="VCC" class="0">
<segment>
<pinref part="5V" gate="-1" pin="S"/>
<wire x1="68.58" y1="78.74" x2="63.5" y2="78.74" width="0.1524" layer="91"/>
<wire x1="63.5" y1="78.74" x2="60.96" y2="76.2" width="0.1524" layer="91"/>
<label x="63.5" y="78.74" size="1.778" layer="95"/>
</segment>
<segment>
<pinref part="GPIO" gate="G$1" pin="2"/>
<wire x1="53.34" y1="38.1" x2="58.42" y2="38.1" width="0.1524" layer="91"/>
<wire x1="58.42" y1="38.1" x2="60.96" y2="40.64" width="0.1524" layer="91"/>
<label x="53.34" y="38.1" size="1.778" layer="95"/>
</segment>
</net>
<net name="GND" class="0">
<segment>
<pinref part="5V" gate="-2" pin="S"/>
<wire x1="68.58" y1="76.2" x2="63.5" y2="76.2" width="0.1524" layer="91"/>
<wire x1="63.5" y1="76.2" x2="60.96" y2="73.66" width="0.1524" layer="91"/>
<label x="63.5" y="76.2" size="1.778" layer="95"/>
</segment>
<segment>
<pinref part="GPIO" gate="G$1" pin="6"/>
<wire x1="53.34" y1="43.18" x2="58.42" y2="43.18" width="0.1524" layer="91"/>
<wire x1="58.42" y1="43.18" x2="60.96" y2="45.72" width="0.1524" layer="91"/>
<label x="53.34" y="43.18" size="1.778" layer="95"/>
</segment>
<segment>
<pinref part="TEMP" gate="G$1" pin="1"/>
<wire x1="68.58" y1="60.96" x2="63.5" y2="60.96" width="0.1524" layer="91"/>
<wire x1="63.5" y1="60.96" x2="60.96" y2="58.42" width="0.1524" layer="91"/>
<label x="63.5" y="60.96" size="1.778" layer="95"/>
</segment>
<segment>
<pinref part="PIR" gate="G$1" pin="3"/>
<wire x1="68.58" y1="40.64" x2="63.5" y2="40.64" width="0.1524" layer="91"/>
<wire x1="63.5" y1="40.64" x2="60.96" y2="38.1" width="0.1524" layer="91"/>
<label x="63.5" y="40.64" size="1.778" layer="95"/>
</segment>
</net>
<net name="SW" class="0">
<segment>
<pinref part="SW" gate="-1" pin="S"/>
<wire x1="68.58" y1="71.12" x2="63.5" y2="71.12" width="0.1524" layer="91"/>
<wire x1="63.5" y1="71.12" x2="60.96" y2="68.58" width="0.1524" layer="91"/>
<label x="63.5" y="71.12" size="1.778" layer="95"/>
</segment>
<segment>
<pinref part="GPIO" gate="G$1" pin="12"/>
<wire x1="53.34" y1="50.8" x2="58.42" y2="50.8" width="0.1524" layer="91"/>
<wire x1="58.42" y1="50.8" x2="60.96" y2="53.34" width="0.1524" layer="91"/>
<label x="53.34" y="50.8" size="1.778" layer="95"/>
</segment>
</net>
<net name="LED" class="0">
<segment>
<pinref part="SW" gate="-2" pin="S"/>
<wire x1="68.58" y1="68.58" x2="63.5" y2="68.58" width="0.1524" layer="91"/>
<wire x1="63.5" y1="68.58" x2="60.96" y2="66.04" width="0.1524" layer="91"/>
<label x="63.5" y="68.58" size="1.778" layer="95"/>
</segment>
<segment>
<pinref part="GPIO" gate="G$1" pin="13"/>
<wire x1="38.1" y1="53.34" x2="30.48" y2="53.34" width="0.1524" layer="91"/>
<wire x1="30.48" y1="53.34" x2="27.94" y2="55.88" width="0.1524" layer="91"/>
<label x="30.48" y="53.34" size="1.778" layer="95"/>
</segment>
</net>
<net name="TEMP" class="0">
<segment>
<pinref part="GPIO" gate="G$1" pin="7"/>
<wire x1="38.1" y1="45.72" x2="30.48" y2="45.72" width="0.1524" layer="91"/>
<wire x1="30.48" y1="45.72" x2="27.94" y2="48.26" width="0.1524" layer="91"/>
<label x="30.48" y="45.72" size="1.778" layer="95"/>
</segment>
<segment>
<pinref part="TEMP" gate="G$1" pin="2"/>
<wire x1="68.58" y1="58.42" x2="63.5" y2="58.42" width="0.1524" layer="91"/>
<wire x1="63.5" y1="58.42" x2="60.96" y2="55.88" width="0.1524" layer="91"/>
<label x="63.5" y="58.42" size="1.778" layer="95"/>
</segment>
</net>
<net name="PIR" class="0">
<segment>
<pinref part="GPIO" gate="G$1" pin="11"/>
<wire x1="38.1" y1="50.8" x2="30.48" y2="50.8" width="0.1524" layer="91"/>
<wire x1="30.48" y1="50.8" x2="27.94" y2="53.34" width="0.1524" layer="91"/>
<label x="30.48" y="50.8" size="1.778" layer="95"/>
</segment>
<segment>
<pinref part="PIR" gate="G$1" pin="2"/>
<wire x1="68.58" y1="43.18" x2="63.5" y2="43.18" width="0.1524" layer="91"/>
<wire x1="63.5" y1="43.18" x2="60.96" y2="40.64" width="0.1524" layer="91"/>
<label x="63.5" y="43.18" size="1.778" layer="95"/>
</segment>
</net>
<net name="3V3" class="0">
<segment>
<pinref part="GPIO" gate="G$1" pin="1"/>
<wire x1="38.1" y1="38.1" x2="30.48" y2="38.1" width="0.1524" layer="91"/>
<wire x1="30.48" y1="38.1" x2="27.94" y2="40.64" width="0.1524" layer="91"/>
<label x="30.48" y="38.1" size="1.778" layer="95"/>
</segment>
<segment>
<pinref part="TEMP" gate="G$1" pin="3"/>
<wire x1="68.58" y1="55.88" x2="63.5" y2="55.88" width="0.1524" layer="91"/>
<wire x1="63.5" y1="55.88" x2="60.96" y2="53.34" width="0.1524" layer="91"/>
<label x="63.5" y="55.88" size="1.778" layer="95"/>
</segment>
<segment>
<pinref part="PIR" gate="G$1" pin="1"/>
<wire x1="68.58" y1="45.72" x2="63.5" y2="45.72" width="0.1524" layer="91"/>
<wire x1="63.5" y1="45.72" x2="60.96" y2="43.18" width="0.1524" layer="91"/>
<label x="63.5" y="45.72" size="1.778" layer="95"/>
</segment>
</net>
</nets>
</sheet>
</sheets>
</schematic>
</drawing>
</eagle>
