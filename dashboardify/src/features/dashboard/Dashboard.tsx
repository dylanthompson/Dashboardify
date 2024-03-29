
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import { ImageLink } from '../image-link/ImageLink';
import { Map } from '../map/Map';
import { Widget } from "../widget/Widget";
import styles from "./Dashboard.module.css";
import Weather from "../weather/Weather";
import Clock from "../clock/Clock";
import { useState } from "react";
import { setLayouts } from "./dashboardSlice";
import { getDefaultBreakpoints, getDefaultColumns } from "./layout";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const ResponsiveGridLayout = WidthProvider(Responsive);

function getWidgetProps(data: any) {
  return { ...data};
}

export function Dashboard(props: any) {

  const renderWidget = function(widget: any) {
    return (
      <div className={selectedWidgetKey == widget.i ? styles.selected : undefined} key={widget.i}>
        <Widget {...getWidgetProps(widget)}>
          {findComponent(widget)}
        </Widget>
    </div>
    )
  }

  const findComponent = function(widget: any) {
    let type = widget?.i?.split('|')[0];
    switch (type){
      case 'ImageLink':
        return (<ImageLink {...widget} />);
      case 'Map':
        return (<Map {...widget}/>);
      case 'Weather':
        return (<Weather {...widget}/>);
      case 'Clock':
        return (<Clock {...widget}/>);
      // case 'Dashboard':
      //    return (<Dashboard { ...widget } {...{storageKey: newDashboardKey}}/>);
      default:
        return widget.toString();
    }
  };

  // layout is an array of objects, see the demo for more complete usage
  const layouts = useAppSelector(state => state.dashboardWidgets.layouts);
  const widgets = useAppSelector(state => state.dashboardWidgets.widgets);
  const selectedWidgetKey = useAppSelector(state => state.dashboardWidgets.selectedWidgetKey);
  const view = useAppSelector(state => state.view.view);
  const dispatch = useAppDispatch();

  const onLayoutChange = (l: any, layouts: any) => {
    dispatch(setLayouts(layouts))
  }

  return (
    <ResponsiveGridLayout
      className={styles.dashboard + (view === 'Edit' ? " " + styles.edit : "")}
      layouts={layouts}
      rowHeight={80}
      verticalCompact={true}
      isDraggable={view === 'Edit'}
      isResizable={view === 'Edit'}
      margin={[0,0]}
      breakpoints={getDefaultBreakpoints()}
      cols={getDefaultColumns()}
      onLayoutChange={(layout, layouts) =>
        onLayoutChange(layout, layouts)
      }
    >
      {
        widgets.map((w: any) => renderWidget(w))
      }
    </ResponsiveGridLayout>
  );
}