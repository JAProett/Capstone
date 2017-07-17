import sqlalchemy
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
import pandas as pd
from sqlalchemy.orm import sessionmaker

engine = sqlalchemy.create_engine('postgresql://jamesdev:jamesp123@localhost/water_qual', echo=True)

Base = declarative_base()

class Site(Base):
    __tablename__ = 'sites'
    id = Column(Integer, primary_key=True)
    SITE_NAME = Column(String)
    M_Result = Column(Float)
    M_Error = Column(Float)
    M_WT_Result = Column(Float)
    M_PH_Result = Column(Float)
    M_DIS_Result = Column(Float)
    M_TUR_Result = Column(Float)
    M_DS_Rain = Column(Float)
    M_Temp = Column(Float)
    N = Column(Float)
    E_std = Column(Float)
    R2 = Column(Float)
    R22 = Column(Float)
    PARM_INTERCIP = Column(Float)
    tSTAT_INTERCIP = Column(Float)
    PARM_WT = Column(Float)
    tSTAT_WT = Column(Float)
    PARM_PH = Column(Float)
    tSTAT_PH = Column(Float)
    PARM_DIS = Column(Float)
    tSTAT_DIS = Column(Float)
    PARM_TUR = Column(Float)
    tSTAT_TUR = Column(Float)
    PARM_DS_Rain = Column(Float)
    tSTAT_DS_Rain = Column(Float)
    PARM_AMB_TEMP = Column(Float)
    tSTAT_AMB_TEMP = Column(Float)
    LAT_DD_WGS84 = Column(Float)
    LON_DD_WGS84 = Column(Float)
# data = pd.read_csv('../front_end/public/assets/statsdata/FINAL_COMBINED_PARMS_3.csv', index_col=False)
# data.to_sql(name='sites', con=engine, if_exists='append')
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()

def get_all_loc():
    locations_all = []
    for SITE_NAME, LAT_DD_WGS84, LON_DD_WGS84 in session.query(Site.SITE_NAME, Site.LAT_DD_WGS84, Site.LON_DD_WGS84):
        locations_all.append({'SITE_NAME': SITE_NAME, 'LAT_DD_WGS84': LAT_DD_WGS84,'LON_DD_WGS84': LON_DD_WGS84})
    return locations_all



def retreave_standard(sel_loc):
    # set params to db values
    SITE_NAME = session.query(Site.SITE_NAME).filter_by(SITE_NAME = sel_loc).one()[0]
    M_Result = session.query(Site.M_Result).filter_by(SITE_NAME = sel_loc).one()[0]
    M_Error = session.query(Site.M_Error).filter_by(SITE_NAME = sel_loc).one()[0]
    M_WT_Result = session.query(Site.M_WT_Result).filter_by(SITE_NAME = sel_loc).one()[0]
    M_PH_Result = session.query(Site.M_PH_Result).filter_by(SITE_NAME = sel_loc).one()[0]
    M_DIS_Result = session.query(Site.M_DIS_Result).filter_by(SITE_NAME = sel_loc).one()[0]
    M_TUR_Result = session.query(Site.M_TUR_Result).filter_by(SITE_NAME = sel_loc).one()[0]
    M_DS_Rain = session.query(Site.M_DS_Rain).filter_by(SITE_NAME = sel_loc).one()[0]
    M_Temp = session.query(Site.M_Temp).filter_by(SITE_NAME = sel_loc).one()[0]
    N = session.query(Site.N).filter_by(SITE_NAME = sel_loc).one()[0]
    E_std = session.query(Site.E_std).filter_by(SITE_NAME = sel_loc).one()[0]
    R2 = session.query(Site.R2).filter_by(SITE_NAME = sel_loc).one()[0]
    R22 = session.query(Site.R22).filter_by(SITE_NAME = sel_loc).one()[0]
    PARM_INTERCIP = session.query(Site.PARM_INTERCIP).filter_by(SITE_NAME = sel_loc).one()[0]
    tSTAT_INTERCIP = session.query(Site.tSTAT_INTERCIP).filter_by(SITE_NAME = sel_loc).one()[0]
    PARM_WT = session.query(Site.PARM_WT).filter_by(SITE_NAME = sel_loc).one()[0]
    tSTAT_WT = session.query(Site.tSTAT_WT).filter_by(SITE_NAME = sel_loc).one()[0]
    PARM_PH = session.query(Site.PARM_PH).filter_by(SITE_NAME = sel_loc).one()[0]
    tSTAT_PH = session.query(Site.tSTAT_PH).filter_by(SITE_NAME = sel_loc).one()[0]
    PARM_DIS = session.query(Site.PARM_DIS).filter_by(SITE_NAME = sel_loc).one()[0]
    tSTAT_DIS = session.query(Site.tSTAT_DIS).filter_by(SITE_NAME = sel_loc).one()[0]
    PARM_TUR = session.query(Site.PARM_TUR).filter_by(SITE_NAME = sel_loc).one()[0]
    tSTAT_TUR = session.query(Site.tSTAT_TUR).filter_by(SITE_NAME = sel_loc).one()[0]
    PARM_DS_Rain = session.query(Site.PARM_DS_Rain).filter_by(SITE_NAME = sel_loc).one()[0]
    tSTAT_DS_Rain = session.query(Site.tSTAT_DS_Rain).filter_by(SITE_NAME = sel_loc).one()[0]
    PARM_AMB_TEMP = session.query(Site.PARM_AMB_TEMP).filter_by(SITE_NAME = sel_loc).one()[0]
    tSTAT_AMB_TEMP = session.query(Site.tSTAT_AMB_TEMP).filter_by(SITE_NAME = sel_loc).one()[0]

    # make a dict with values
    params = {'SITE_NAME': SITE_NAME, 'M_Result': M_Result, 'M_Error': M_Error, 'M_WT_Result': M_WT_Result, 'M_PH_Result': M_PH_Result, 'M_DIS_Result': M_DIS_Result, 'M_TUR_Result': M_TUR_Result, 'M_DS_Rain': M_DS_Rain, 'M_Temp': M_Temp, 'N': N, 'E_std': E_std, 'R2': R2, 'R22': R22, 'PARM_INTERCIP': PARM_INTERCIP, 'tSTAT_INTERCIP': tSTAT_INTERCIP, 'PARM_WT': PARM_WT, 'tSTAT_WT': tSTAT_WT, 'PARM_PH': PARM_PH, 'tSTAT_PH': tSTAT_PH, 'PARM_DIS': PARM_DIS, 'tSTAT_DIS': tSTAT_DIS, 'PARM_TUR': PARM_TUR, 'tSTAT_TUR': tSTAT_TUR, 'PARM_DS_Rain': PARM_DS_Rain, 'tSTAT_DS_Rain': tSTAT_DS_Rain, 'PARM_AMB_TEMP': PARM_AMB_TEMP, 'tSTAT_AMB_TEMP': tSTAT_AMB_TEMP}
    return params

# print(retreave_standard("Barton Spring Pool @ Downstream Dam"))
